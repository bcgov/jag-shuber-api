import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { LeaveCancelCode } from '../models/LeaveCancelCode';


export class LeaveCancelCodeService extends ExpirableDatabaseService<LeaveCancelCode> {
    fieldMap = {
        leave_cancel_code: 'code',
        description: 'description'
    };

    constructor() {
        super('leave_cancel_code', 'leave_cancel_code');
    }

}