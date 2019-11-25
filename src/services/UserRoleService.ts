import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class UserRoleService extends ExpirableDatabaseService<UserRole> {
    fieldMap = {
        user_role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('app_user_role', 'app_user_role_id');
    }
}
