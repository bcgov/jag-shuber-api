import { Duty } from '../models/Duty';
import moment from 'moment';
import { DatabaseService } from './DatabaseService';
import { AssignmentService } from './AssignmentService';
import { DutyRecurrenceService } from './DutyRecurrenceService';
import { DutyImportDefaultsRequest } from '../models/DutyImportDefaultsRequest';
import { DutyRecurrence } from '../models/DutyRecurrence';
import { SheriffDuty } from '../models/SheriffDuty';
import { SheriffDutyService } from './SheriffDutyService';
import { ClientBase } from 'pg';

export class DutyService extends DatabaseService<Duty> {
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
    }

    getSheriffDutyService(dbClient?: ClientBase) {
        const service = new SheriffDutyService();
        if (dbClient) {
            service.dbClient = dbClient;
        }
        return service;
    }

    async create(entity: Partial<Duty>): Promise<Duty> {
        const { sheriffDuties = [] } = entity;
        const query = this.getInsertQuery(entity);
        let createdDuty: Duty = {} as any;
        await this.db.transaction(async (client) => {
            const sheriffDutyService = this.getSheriffDutyService(client);
            const { rows } = await client.query(query.toString());
            createdDuty = rows[0];
            createdDuty.sheriffDuties = await Promise.all(
                sheriffDuties.map(sd => sheriffDutyService.create({
                    ...sd,
                    dutyId: createdDuty.id
                }))
            );
        });
        return createdDuty;
    }

    async getById(id: string) {
        const sheriffDuties = this.getSheriffDutyService().getAllForDuty(id);
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
        const sheriffDuties = await this.getSheriffDutyService().getAllForDuties(dutyIds);
        return duties.map(duty => (
            {
                ...duty,
                sheriffDuties: sheriffDuties.filter(sd => sd.dutyId === duty.id)
            }
        ));
    }

    async update(entity: Partial<Duty>): Promise<Duty> {
        const query = this.getUpdateQuery(entity);
        let updatedEntity: Duty = undefined as any;
        const { sheriffDuties = [] } = entity;

        await this.db.transaction(async (client) => {
            // Setup the dutyRecurrenceService for transaction
            const sheriffDutyService = this.getSheriffDutyService(client);

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
                .map(sd => sheriffDutyService.create(sd));

            // Update existing duty recurrences
            const updatePromises = sheriffDutiesWithDutyId
                .filter(sd => sd.id != undefined)
                .map(sd => sheriffDutyService.update(sd));
            const allSheriffDuties = await Promise.all(createPromises.concat(updatePromises));
            updatedEntity.sheriffDuties = allSheriffDuties;
        });
        return updatedEntity;
    }

    async delete(id: string): Promise<void> {
        const deleteQuery = this.getDeleteQuery(id);
        await this.db.transaction(async (client) => {
            const delChildrenQuery = this.squel.delete()
                .from(this.getSheriffDutyService().dbTableName)
                .where(`duty_id='${id}'`);
            await client.query(delChildrenQuery.toString());
            await client.query(deleteQuery.toString());
        });
    }

    async importDefaults(request: DutyImportDefaultsRequest): Promise<Duty[]> {
        const { courthouseId, date } = request;
        const dateMoment = date ? moment(date) : moment();
        let createdDuties: Duty[] = [];
        // Setup transaction for creating all of the duties / sheriff duties

        const assignmentService = new AssignmentService();
        const dutyReccurenceService = new DutyRecurrenceService();

        // todo: This should be in utility shared by client / backend
        const dayOfInterest = 1 << (dateMoment.isoWeekday() - 1);

        // The following query goes and selects all of the duty recurrences that are valid for this
        // date which haven't been used to create any existing duties yet
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
                        .from(this.dbTableName)
                        .where(`${this.dbTableName}.duty_recurrence_id=${dutyRecurrenceTableAlias}.duty_recurrence_id`)
                        .where(`date_trunc('day',${this.dbTableName}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                        .toString()
                )
            );
        const recurrencesToCreate = await this.executeQuery<DutyRecurrence>(query.toString());
        
        // For each of the recurrences, create the duty and sheriff Duties
        createdDuties = await Promise.all(recurrencesToCreate.map(async (dr) => {
            const startDateTime = dateMoment.startOf('day').add(moment.duration(dr.startTime)).toISOString();
            const endDateTime = dateMoment.startOf('day').add(moment.duration(dr.endTime)).toISOString();
            const sheriffDuties = [...Array(dr.sheriffsRequired).keys()].map<SheriffDuty>(k => (
                {
                    startDateTime,
                    endDateTime
                }
            ));
            return await this.create({
                assignmentId: dr.assignmentId,
                dutyRecurrenceId: dr.id,
                sheriffsRequired: dr.sheriffsRequired,
                startDateTime,
                endDateTime,
                sheriffDuties
            });
        }));

        return createdDuties;
    }
}