import { DatabaseService } from '../infrastructure/DatabaseService';
import { RolePermission } from '../models/RolePermission';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RolePermissionService extends DatabaseService<RolePermission> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('app_role_permission', 'app_role_permission_id');
    }

}
