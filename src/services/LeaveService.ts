import { DatabaseService } from './DatabaseService';
import { Leave } from '../models/Leave';

export class LeaveService extends DatabaseService<Leave> {

    fieldMap: { [key: string]: string; } = {
        leave_id: 'id',
        sheriff_id: 'sheriffId',
        leave_code: 'leaveCode',
        leave_sub_code: 'leaveSubCode',
        start_date: 'startDate',
        end_date: 'endDate',
        start_time: 'startTime',
        end_time: 'endTime',
        partial_day_ind: 'isPartial',
        comment: 'comment',
        cancelled_dtm: 'cancelDate',
        leave_cancel_reason_code: 'cancelReasonCode'
    };
    constructor() {
        super('leave', 'leave_id');
    }
}