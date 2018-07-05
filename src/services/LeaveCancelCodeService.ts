import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveCancelReasonCode } from '../models/LeaveCancelReasonCode';


export class LeaveCancelReasonCodeService extends ExpirableDatabaseService<LeaveCancelReasonCode> {
    fieldMap = {
        leave_cancel_code: 'code',
        description: 'description'
    };

    constructor() {
        super('leave_cancel_code', 'leave_cancel_code');
    }

}