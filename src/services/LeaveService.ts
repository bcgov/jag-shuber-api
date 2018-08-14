import { DatabaseService } from '../infrastructure/DatabaseService';
import { Leave } from '../models/Leave';
import moment from 'moment';

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

    private convertDates(leave: Leave) {
        const updatedLeave: Leave = {
            ...leave,
            startDate: moment(leave.startDate).format('YYYY-MM-DD'),
            endDate: leave.endDate ? moment(leave.endDate).format('YYYY-MM-DD') : undefined
        }

        return updatedLeave;
    }

    async getAll() {
        return (await super.getAll()).map(l => this.convertDates(l));
    }

    async getById(id: string) {
        const leave = await super.getById(id);
        if (leave) {
            return this.convertDates(leave);
        }
        return undefined;
    }

    async create(leave: Partial<Leave>): Promise<Leave> {
        const newLeave = await super.create(leave);
        return this.convertDates(newLeave);
    }

    async update(leave: Partial<Leave>): Promise<Leave> {
        const updatedLeave = await super.update(leave);
        return this.convertDates(updatedLeave);
    }
    
}