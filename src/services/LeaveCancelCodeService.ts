import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveCancelReasonCode } from '../models/LeaveCancelReasonCode';


export class LeaveCancelReasonCodeService extends ExpirableDatabaseService<LeaveCancelReasonCode> {
    fieldMap = {
        leave_cancel_reason_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('leave_cancel_reason_code', 'leave_cancel_reason_code');
    }

}