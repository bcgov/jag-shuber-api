import { Duty } from '../models/Duty';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { SheriffDuty } from '../models/SheriffDuty';
import { AutoWired } from 'typescript-ioc';
import { SheriffDutyAutoAssignRequest } from '../models/SheriffDutyAutoAssignRequest';

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

        // Execute the transaction to auto assign the sheriff duties
        const assignedSheriffDuties = await this.db.transaction(async client => {
            // Select all SheriffDuties that are
            // 1. Not assigned
            // 2. Associated with an imported Duty
            // 3. Associated with the given courthouse
            // 4. On the given date            
            // this.getSelectQuery().where('duty_id IN (SELECT ');
            // todo

            // Select all shifts that
            // 1. Have an assignment_id that is within the collection of assignment id's above
            // 2. From the given courthouse
            // 3. On the given date
            // todo

            // Update SheriffDuties
            // Set sheriffDuty.sheriff_id = shift.sheriff_id where
            // the |sheriffDuty.startTime - shift.startTime| is a minimum
            // todo
        });
        return [];
    }
}