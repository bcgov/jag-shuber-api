import { DatabaseService } from '../infrastructure/DatabaseService';
import { Role } from '../models/Role';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleService extends DatabaseService<Role> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('app_role', 'app_role_id');
    }
}
