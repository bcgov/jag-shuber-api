import { Duty } from '../models/Duty';
import { DatabaseService } from './DatabaseService';


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

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Duty>(query.toString());
        return rows;
    }
}