import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveCode } from '../models/LeaveCode';


export class LeaveCodeService extends ExpirableDatabaseService<LeaveCode> {
    fieldMap = {
        leave_type_code: 'code',
        description: 'description'
    };

    constructor() {
        super('leave_type_code', 'leave_type_code');
    }

}