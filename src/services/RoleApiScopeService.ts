import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleApiScope } from '../models/RoleApiScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleApiScopeService extends DatabaseService<RoleApiScope> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('app_role_api_scope', 'app_role_api_scope_id');
    }

}
