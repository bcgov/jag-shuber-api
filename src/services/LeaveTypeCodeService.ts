import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveTypeCode } from '../models/LeaveTypeCode';


export class LeaveTypeCodeService extends ExpirableDatabaseService<LeaveTypeCode> {
    fieldMap = {
        leave_type_code: 'code',
        description: 'description'
    };

    constructor() {
        super('leave_type_code', 'leave_type_code');
    }

}