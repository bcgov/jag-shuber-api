import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { LeaveCancelReasonCode } from '../models/LeaveCancelReasonCode';
import { AutoWired } from 'typescript-ioc';

@AutoWired
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