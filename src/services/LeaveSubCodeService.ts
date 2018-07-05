import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveSubCode } from '../models/LeaveSubCode';


export class LeaveCodeService extends ExpirableDatabaseService<LeaveSubCode> {
    fieldMap = {
        leave_code: 'leaveCode',
        leave_sub_code: 'subCode',
        description: 'description'
    };

    constructor() {
        super('leave_sub_code', 'leave_sub_code');
    }

}