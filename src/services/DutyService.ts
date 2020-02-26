import { Duty } from '../models/Duty';
import moment from 'moment';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AssignmentService } from './AssignmentService';
import { DutyRecurrenceService } from './DutyRecurrenceService';
import { DutyImportDefaultsRequest } from '../models/DutyImportDefaultsRequest';
import { DutyRecurrence } from '../models/DutyRecurrence';
import { SheriffDuty } from '../models/SheriffDuty';
import { SheriffDutyService } from './SheriffDutyService';
import { ClientBase } from 'pg';
import { setTime, fromTimeString } from '../common/TimeUtils';
import { AutoWired, Container, Inject } from 'typescript-ioc';
import { DateType } from '../client';

@AutoWired
export class DutyService extends DatabaseService<Duty> {
    
    @Inject
    private standardSheriffDutyService!: SheriffDutyService;

    fieldMap = {
        duty_id: 'id',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime',
        assignment_id: 'assignmentId',
        duty_recurrence_id: 'dutyRecurrenceId',
        comment: 'comments'
    };

    constructor() {
        super('duty', 'duty_id');
    }

    async create(entity: Partial<Duty>): Promise<Duty> {
        const { sheriffDuties = [] } = entity;
        const query = this.getInsertQuery({ ...entity });
        return await this.db.transaction(async ({ client, getService }) => {
            const sheriffDutyService = getService<SheriffDutyService>(SheriffDutyService);
            const { rows } = await client.query(query.toString());
            const createdDuty: Duty = rows[0];
            createdDuty.sheriffDuties = await Promise.all(
                sheriffDuties.map(sd => sheriffDutyService.create({
                    ...sd,
                    dutyId: createdDuty.id
                }))
            );
            return createdDuty;
        });
    }

    async getById(id: string) {
        const sheriffDuties = this.standardSheriffDutyService.getAllForDuty(id);
        const duty = await super.getById(id);
        if (duty) {
            duty.sheriffDuties = await sheriffDuties
        }
        return duty;
    }

    async getAll(locationId?: string, startDate?: DateType, endDate?: DateType) {
        const query = super.getSelectQuery();
        if (locationId) {
            const assignmentService = Container.get(AssignmentService) as AssignmentService;
            query.join(assignmentService.dbTableName, undefined, "duty.assignment_id=assignment.assignment_id");
            query.where(`location_id='${locationId}'`);
        };
        if (startDate) {
            query.where(`start_dtm>=Date('${moment(startDate).toISOString()}')`);
        };
        if (endDate) {
            query.where(`end_dtm<=Date('${moment(endDate).toISOString()}')`);
        };

        console.log('debug duty query, there is something that is not working right, maybe it is timezone related');
        console.log(query.toString());
        const duties = await this.executeQuery<Duty>(query.toString());
        const dutyIds = duties.map(a => a.id) as string[];
        const sheriffDuties = await this.standardSheriffDutyService.getAllForDuties(dutyIds);
        return duties.map(duty => (
            {
                ...duty,
                sheriffDuties: sheriffDuties.filter(sd => sd.dutyId === duty.id)
            }
        ));
    }

    async update(entity: Partial<Duty>): Promise<Duty> {
        const query = this.getUpdateQuery(entity);
        const { sheriffDuties = [] } = entity;
        return await this.db.transaction(async ({client,getService}) => {
            // Setup the dutyRecurrenceService for transaction
            const sheriffDutyService = getService<SheriffDutyService>(SheriffDutyService);

            // Update the Entity
            const { rows } = await client.query(query.toString());
            const updatedEntity: Duty = rows[0];

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
            return updatedEntity
        });
    }

    async delete(id: string): Promise<void> {
        const deleteQuery = this.getDeleteQuery(id);
        await this.db.transaction(async ({client}) => {
            const delChildrenQuery = this.squel.delete()
                .from(this.standardSheriffDutyService.dbTableName)
                .where(`duty_id='${id}'`);
            await client.query(delChildrenQuery.toString());
            await client.query(deleteQuery.toString());
        });
    }

    async importDefaults(request: DutyImportDefaultsRequest): Promise<Duty[]> {
        const { locationId, date } = request;
        const dateMoment = date ? moment(date) : moment();

        const assignmentService = Container.get(AssignmentService) as AssignmentService;
        const dutyReccurenceService = Container.get(DutyRecurrenceService) as DutyRecurrenceService;

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
            .where(assignmentService.getEffectiveWhereClause({
                startDate: dateMoment.format(),
                fieldAlias: 'a'
            }))
            .where(dutyReccurenceService.getEffectiveWhereClause({
                startDate: dateMoment.format(),
                fieldAlias: 'dr'
            }))
            .where(`a.location_id='${locationId}'`)
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

        // Setup transaction for creating all of the duties / sheriff duties
        const createdDuties = await this.db.transaction(async ({client,getService}) => {
            const service = getService<DutyService>(DutyService);
            const recurrencesToCreate = await service.executeQuery<DutyRecurrence>(query.toString());

            // For each of the recurrences, create the duty and sheriff Duties
            return await Promise.all(recurrencesToCreate.map(async (dr) => {
                const startTimeMoment = fromTimeString(dr.startTime);
                const startOfDay = moment()
                    .utcOffset(startTimeMoment.utcOffset())
                    .set({
                        year: dateMoment.year(),
                        month: dateMoment.month(),
                        date: dateMoment.date()
                    })
                    .startOf('day');

                const startDateTime = setTime(startOfDay, dr.startTime)
                    .toISOString();
                const endDateTime = setTime(startOfDay, dr.endTime)
                    .toISOString();
                const sheriffDuties: SheriffDuty[] = [];
                // Create a blank sheriffDuty for each sheriff required
                for (let i = 0; i < dr.sheriffsRequired; ++i) {
                    sheriffDuties.push({
                        startDateTime,
                        endDateTime
                    })
                }

                return await service.create({
                    assignmentId: dr.assignmentId,
                    dutyRecurrenceId: dr.id,
                    startDateTime,
                    endDateTime,
                    sheriffDuties
                });
            }));
        });

        return createdDuties;
    }
}