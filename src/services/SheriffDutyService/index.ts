import { DatabaseService } from '../../infrastructure/DatabaseService';
import { SheriffDuty } from '../../models/SheriffDuty';
import { AutoWired } from 'typescript-ioc';
import { SheriffDutyAutoAssignRequest } from '../../models/SheriffDutyAutoAssignRequest';
import { ShiftService } from '../ShiftService';
import moment from 'moment';
import { DutyService } from '../DutyService';
import { AssignmentService } from '../AssignmentService';
import SheriffDutyAutoAssigner from './SheriffDutyAutoAssigner';
import { SheriffDutyWithAssignment } from './SheriffDutyAssignmentMap';

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
            const shiftsPromise = shiftService.select(query => {
                return query
                    .where(`date_trunc('day',${shiftService.dbTableName}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                    .where(`courthouse_id='${courthouseId}'`)
                    .where(`assignment_id IS NOT NULL`);
            });

            // Select all SheriffDuties & AssignmentId that are:
            // 1. Associated with the given courthouse
            // 2. On the given date    
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
                .where(`date_trunc('day',${sheriffDutyTableAlias}.start_dtm)=DATE('${dateMoment.toISOString()}')`)
                .toString();

            const allSheriffDuties = await sheriffDutyService.executeQuery<SheriffDutyWithAssignment>(sheriffDutyQuery);

            // Wait for our shifts request since we need it below
            const shifts = await shiftsPromise;

            const autoAssignStrategy = new SheriffDutyAutoAssigner();
            
            const sheriffDutiesToUpdate = autoAssignStrategy.autoAssignDuties(allSheriffDuties,shifts);
            
            console.log(sheriffDutiesToUpdate);
            // Update SheriffDuties
            return await Promise.all(sheriffDutiesToUpdate.map(sd => sheriffDutyService.update(sd)));
        });
        return assignedSheriffDuties;
    }
}