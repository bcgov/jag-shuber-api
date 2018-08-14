import { DutyRecurrence } from '../models/DutyRecurrence';
import ExpirableDatabaseService, { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';


export class DutyRecurrenceService extends ExpirableDatabaseService<DutyRecurrence> {
    fieldMap = {
        duty_recurrence_id: 'id',
        start_time: 'startTime',
        end_time: 'endTime',
        days_bitmap: 'daysBitmap',
        sheriffs_required: 'sheriffsRequired',
        assignment_id: 'assignmentId'
    };

    constructor() {
        super('duty_recurrence', 'duty_recurrence_id');
    }

    async getAllForAssignments(assignmentIds: string[] = [], options?:EffectiveQueryOptions): Promise<DutyRecurrence[]> {
        if (assignmentIds.length === 0) {
            return [];
        }
        const query = super.getEffectiveSelectQuery(options);
        query.where(`assignment_id IN (${assignmentIds.map(s => `'${s}'`).join(',')})`);
        query.order('assignment_id');
        return await this.executeQuery<DutyRecurrence>(query.toString());
    }

    async getAllForAssignment(assignmentId: string, options?:EffectiveQueryOptions): Promise<DutyRecurrence[]> {
        return this.getAllForAssignments([assignmentId], options);
    }
}