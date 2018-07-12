import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class JailRoleCodeService extends ExpirableDatabaseService<JailRoleCode> {
    fieldMap = {
        jail_role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('jail_role_code', 'jail_role_code');
    }

}