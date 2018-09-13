import { Duty } from '../models/Duty';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { SheriffDuty } from '../models/SheriffDuty';
import { AutoWired, Container } from 'typescript-ioc';
import { SheriffDutyAutoAssignRequest } from '../models/SheriffDutyAutoAssignRequest';
import { ShiftService } from './ShiftService';
import moment from 'moment';
import { DutyService } from './DutyService';
import { AssignmentService } from './AssignmentService';
import { ClientBase } from 'pg';

@AutoWired
export class SheriffDutyService extends DatabaseService<SheriffDuty> {

    fieldMap = {
        sheriff_duty_id: 'id',
        duty_id: 'dutyId',
        sheriff_id: 'sheriffId',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime'
    };

    constructor() {
        super('sheriff_duty', 'sheriff_duty_id');
    }

    async getAllForDuties(dutyIds: string[] = []): Promise<SheriffDuty[]> {
        if (dutyIds.length == 0) {
            return [];
        }

        const query = this.getSelectQuery();
        query.where('duty_id IN ?', dutyIds);
        query.order('duty_id');
        return await this.executeQuery<SheriffDuty>(query.toString());
    }
    async getAllForDuty(dutyId: string): Promise<SheriffDuty[]> {
        if (!dutyId) {
            return []
        }
        return this.getAllForDuties([dutyId]);
    }

    async autoAssignFromShifts(payload: SheriffDutyAutoAssignRequest): Promise<SheriffDuty[]> {
        const {
            courthouseId,
            date
        } = payload;
        const dateMoment = moment(date);

        // Execute the transaction to auto assign the sheriff duties
        const assignedSheriffDuties = await this.db.transaction(async ({ client, getService }) => {
            // Pull out necessary services from transaction context
            const sheriffDutyService = getService<SheriffDutyService>(SheriffDutyService);
            const shiftService = getService<ShiftService>(ShiftService);
            const dutyService = getService<DutyService>(DutyService);
            const assignmentService = getService<AssignmentService>(AssignmentService);

            // Select all shifts that
            // - Are linked to an assignment 
            // - From the given courthouse
            // - On the given date
            const shifts = await shiftService.select(query => {
                return query
                    .where(`date_trunc('day',${shiftService.dbTableName}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                    .where(`courthouse_id='${courthouseId}'`)
                    .where(`assignment_id IS NOT NULL`);
            });

            // Select all SheriffDuties that are
            // 1. Not assigned
            // 2. Associated with one of the assignments above
            // 3. Associated with the given courthouse
            // 4. On the given date            
            // this.getSelectQuery().where('duty_id IN (SELECT ');
            const sheriffDutyTableAlias = 'sd';
            const dutyTableAlias = 'd';
            const assignmentTableAlias = 'a';
            const sheriffDutyQuery = this.squel.select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.dbTableName, sheriffDutyTableAlias)
                .fields(this.getAliasedFieldMap(sheriffDutyTableAlias))
                .field(`${assignmentTableAlias}.assignment_id`, 'assignmentId')
                .join(dutyService.dbTableName, dutyTableAlias, `${sheriffDutyTableAlias}.duty_id=${dutyTableAlias}.duty_id`)
                .join(assignmentService.dbTableName, assignmentTableAlias, `${dutyTableAlias}.assignment_id=${assignmentTableAlias}.assignment_id`)
                .where(`${assignmentTableAlias}.courthouse_id='${courthouseId}'`)
                .where(`${sheriffDutyTableAlias}.sheriff_id IS NULL`)
                .where(`date_trunc('day',${sheriffDutyTableAlias}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                .where(`${assignmentTableAlias}.assignment_id IN ?`, shifts.map(s => s.assignmentId))
                .toString();

            const sheriffDutiesToAssign = await sheriffDutyService.executeQuery<SheriffDuty & { assignmentId: string }>(sheriffDutyQuery);

            const sheriffDutiesToUpdate: SheriffDuty[] = [];
            shifts.forEach(shift => {
                const shiftStart = moment(shift.startDateTime);
                // Sort the sheriffDutiesToAssign based difference between shift startTime
                // and startTime of SheriffDuty, filtering out ones that have already been
                //
                const sheriffDutyToUpdate = sheriffDutiesToAssign
                    .filter(sd => sd.assignmentId === shift.assignmentId)
                    .map(({ assignmentId, ...sd }) => sd)
                    .filter(sd => sheriffDutiesToUpdate.every(sdtu => sdtu.id !== sd.id))
                    .sort((a, b) => {
                        return Math.abs(shiftStart.diff(moment(a.startDateTime))) - Math.abs(shiftStart.diff(moment(b.startDateTime)));
                    })[0];

                if (sheriffDutyToUpdate) {
                    // todo: figure out why datetimes aren't working well here
                    sheriffDutiesToUpdate.push({
                        ...sheriffDutyToUpdate,
                        startDateTime: moment(sheriffDutyToUpdate.startDateTime).format(),
                        endDateTime: moment(sheriffDutyToUpdate.endDateTime).format(),
                        sheriffId: shift.sheriffId
                    });
                }
            });

            // Update SheriffDuties
            // Set sheriffDuty.sheriff_id = shift.sheriff_id where
            // the |sheriffDuty.startTime - shift.startTime| is a minimum
            return await Promise.all(sheriffDutiesToUpdate.map(sd => sheriffDutyService.update(sd)));
        });
        return assignedSheriffDuties;
    }
}