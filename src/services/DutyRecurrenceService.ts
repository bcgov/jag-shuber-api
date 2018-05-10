import { DutyRecurrence } from '../models/DutyRecurrence';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class DutyRecurrenceService extends ExpirableDatabaseService<DutyRecurrence> {
    fieldMap = {
        duty_recurrence_id: 'id',
        start_time: 'startTime',
        end_time: 'endTime',
        days_bitmap: 'daysBitmap',
        sheriffs_required: 'sheriffsRequired',
        assignment_id: 'assignmentId',
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('duty_recurrence', 'duty_recurrence_id', true);
    }

    async getAll(startDate?: string, endDate?: string) {
        const query = super.getEffectiveSelectQuery(startDate, endDate);
        
        const rows = await this.executeQuery<DutyRecurrence>(query.toString());
        return rows;
    }
}