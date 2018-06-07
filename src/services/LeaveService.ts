import { DatabaseService } from './DatabaseService';
import { Leave } from '../models/Leave';

export class LeaveService extends DatabaseService<Leave> {

    fieldMap: { [key: string]: string; } = {
        leave_id: 'id',
        sheriff_id: 'sheriffId',
        start_date: 'startDate',
        end_date: 'endDate',
        leave_type: 'leaveType',
        cancel_date: 'cancelDate',
        cancel_reason: 'cancelReason'
    };
    constructor() {
        super('leave', 'leave_id');
    }
}