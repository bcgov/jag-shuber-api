import { JailRoleCode } from '../models/JailRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
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