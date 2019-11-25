import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleFrontendScopeService extends DatabaseService<RoleFrontendScope> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('app_role_frontend_scope', 'app_role_frontend_scope_id');
    }

}
