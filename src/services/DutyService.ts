import { Duty } from '../models/Duty';
import moment from 'moment';
import { DatabaseService } from './DatabaseService';
import { AssignmentService } from './AssignmentService';
import { DutyRecurrenceService } from './DutyRecurrenceService';
import { DutyImportDefaultsRequest } from '../models/DutyImportDefaultsRequest';
import { DutyRecurrence } from '../models/DutyRecurrence';
import { SheriffDuty } from '../models/SheriffDuty';
import { SheriffDutyService } from './SheriffDutyService';

export class DutyService extends DatabaseService<Duty> {

    private sheriffDutyService: SheriffDutyService;
    fieldMap = {
        duty_id: 'id',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime',
        sheriffs_required: 'sheriffsRequired',
        assignment_id: 'assignmentId',
        duty_recurrence_id: 'dutyRecurrenceId'
    };

    constructor() {
        super('duty', 'duty_id');
        // todo: Would be better to use IoC here
        this.sheriffDutyService = new SheriffDutyService();
    }

    async create(entity: Partial<Duty>): Promise<Duty> {
        const { sheriffDuties = [] } = entity;
        const query = this.getInsertQuery(entity);
        let createdDuty: Duty = {} as any;
        try {
            await this.db.transaction(async (client) => {
                this.sheriffDutyService.dbClient = client;
                const { rows } = await client.query(query.toString());
                createdDuty = rows[0];
                createdDuty.sheriffDuties = await Promise.all(
                    sheriffDuties.map(sd => this.sheriffDutyService.create({
                        ...sd,
                        dutyId: createdDuty.id
                    }))
                );
            })
        } finally {
            this.sheriffDutyService.dbClient = undefined;
        }

        return createdDuty;
    }

    async getById(id:string){
        const sheriffDuties = this.sheriffDutyService.getAllForDuty(id);
        const duty = await super.getById(id);
        if (duty) {
            duty.sheriffDuties = await sheriffDuties
        }
        return duty;
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const duties = await this.executeQuery<Duty>(query.toString());
        const dutyIds = duties.map(a => a.id) as string[];
        const sheriffDuties = await this.sheriffDutyService.getAllForDuties(dutyIds);
        return duties.map(duty => (
            {
                ...duty,
                sheriffDuties: sheriffDuties.filter(sd => sd.dutyId === duty.id)
            }
        ));
    }

    async update(entity:Partial<Duty>):Promise<Duty>{
        const query = this.getUpdateQuery(entity);
        let updatedEntity: Duty = undefined as any;
        const { sheriffDuties = [] } = entity;
        try {
            await this.db.transaction(async (client) => {
                // Setup the dutyRecurrenceService for transaction
                this.sheriffDutyService.dbClient = client;

                // Update the Entity
                const { rows } = await client.query(query.toString());
                updatedEntity = rows[0];

                const sheriffDutiesWithDutyId = sheriffDuties.map(dr => ({
                    ...dr,
                    dutyId: entity.id
                }));
                // Create new duty recurrences, adding on assignmentId
                const createPromises = sheriffDutiesWithDutyId
                    .filter(sd => sd.id == undefined)
                    .map(sd => this.sheriffDutyService.create(sd));

                // Update existing duty recurrences
                const updatePromises = sheriffDutiesWithDutyId
                    .filter(sd => sd.id != undefined)
                    .map(sd => this.sheriffDutyService.update(sd));
                const allSheriffDuties = await Promise.all(createPromises.concat(updatePromises));
                updatedEntity.sheriffDuties = allSheriffDuties;
            });
        } finally {
            // transaction finished, reset dutyRecurrence client
            this.sheriffDutyService.dbClient = undefined;
        }

        return updatedEntity;
    }
    
    async delete(id:string):Promise<void>{
        const deleteQuery = this.getDeleteQuery(id);
        await this.db.transaction(async (client) => {
            const delChildrenQuery = this.squel.delete()
                .from(this.sheriffDutyService.dbTableName)
                .where(`duty_id='${id}'`);
            await client.query(delChildrenQuery.toString());
            await client.query(deleteQuery.toString());
        });
    }

    async importDefaults(request: DutyImportDefaultsRequest): Promise<Duty[]> {
        const { courthouseId, date } = request;
        const dateMoment = date ? moment(date) : moment();
        const createdDuties: Duty[] = [];
        // Setup transaction for creating all of the duties / sheriff duties
        this.db.transaction(async (client) => {
            const assignmentService = new AssignmentService();
            assignmentService.dbClient = client;
            const dutyReccurenceService = new DutyRecurrenceService();
            dutyReccurenceService.dbClient = client;
            const dutyService = new DutyService();
            dutyService.dbClient;

            // todo: This should be in utility shared by client / backend
            const dayOfInterest = 1 << (dateMoment.isoWeekday() - 1);

            const dutyRecurrenceTableAlias = 'dr';
            const query = this.squel.select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .with('vars', this.squel.select().field(`${dayOfInterest}::bit(7)`, 'day_of_interest'))
                .from('vars')
                .from(dutyReccurenceService.dbTableName, dutyRecurrenceTableAlias)
                .fields(dutyReccurenceService.getAliasedFieldMap(dutyRecurrenceTableAlias))
                .join(assignmentService.dbTableName, 'a', `${dutyRecurrenceTableAlias}.assignment_id=a.assignment_id`)
                .where(`a.courthouse_id='${courthouseId}'`)
                .where(`(cast(${dutyRecurrenceTableAlias}.days_bitmap::bigint as bit(7)) & day_of_interest)=day_of_interest`)
                .where('NOT EXISTS ?',
                    this.squel.str(
                        this.squel.select()
                            .field('duty_id')
                            .from(dutyService.dbTableName)
                            .where(`${dutyService.dbTableName}.duty_recurrence_id=${dutyRecurrenceTableAlias}.duty_recurrence_id`)
                            .where(`date_trunc('day',${dutyService.dbTableName}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                            .toString()
                    )
                );
            const recurrencesToCreate = await this.executeQuery<DutyRecurrence>(query.toString());

            // Need to incorporate the timezone offset that we receive from the client request
            const startOfDateMoment = dateMoment.startOf('day').add(dateMoment.utcOffset(), 'minutes');

            // For each of the recurrences, create the duty and sheriff Duties
            recurrencesToCreate.forEach(async (dr) => {
                const duty = await dutyService.create({
                    assignmentId: dr.assignmentId,
                    dutyRecurrenceId: dr.id,
                    sheriffsRequired: dr.sheriffsRequired,
                    startDateTime: startOfDateMoment.add(moment.duration(dr.startTime)).toISOString(),
                    endDateTime: startOfDateMoment.add(moment.duration(dr.endTime)).toISOString(),
                });

            });

            console.log(courthouseId, dateMoment.utcOffset(), recurrencesToCreate);
        });

        // Query for selecting duty recurrences that need duties generated
        // WITH vars as (SELECT 8::bit(7) as day_of_interest)
        // select 
        //     dr.duty_recurrence_id, 
        //     dr.start_time, 
        //     dr.end_time, 
        //     dr.sheriffs_required, 
        //     dr.assignment_id, 
        //     dr.days_bitmap,
        //     cast((dr.days_bitmap::bigint) as bit(7)) as days_of_week
        //     from vars, duty_recurrence as dr join assignment as a 
        //     on (dr.assignment_id=a.assignment_id)
        //     where a.courthouse_id='8117ea77-fa37-4442-a865-4e64f70b7cfa'
        //     and (cast(dr.days_bitmap::bigint as bit(7)) & day_of_interest)=day_of_interest
        //     and NOT EXISTS (
        //         select duty_id from duty 
        //         where duty.duty_recurrence_id = dr.duty_recurrence_id
        //         AND date_trunc('day',duty.start_dtm)=date_trunc('day',current_timestamp)
        //     )
        // throw "Not Implemented";

        return createdDuties;
    }
}