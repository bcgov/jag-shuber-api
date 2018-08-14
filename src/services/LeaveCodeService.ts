import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { LeaveCode } from '../models/LeaveCode';


export class LeaveCodeService extends ExpirableDatabaseService<LeaveCode> {
    fieldMap = {
        leave_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('leave_code', 'leave_code');
    }

}