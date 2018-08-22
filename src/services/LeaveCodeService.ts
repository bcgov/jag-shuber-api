import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { LeaveCode } from '../models/LeaveCode';
import { AutoWired } from 'typescript-ioc';

@AutoWired
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