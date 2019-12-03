import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleFrontendScopeService extends DatabaseService<RoleFrontendScope> {
    fieldMap = {
        app_role_frontend_scope_id: 'id',
        app_role_id: 'roleId',
        // frontend_scope_string: 'scopeString',
        frontend_scope_id: 'scopeId', // TODO: Remove this from the model and DB... we use scopeCode instead?
    };

    constructor() {
        super('app_role_frontend_scope', 'app_role_frontend_scope_id');
    }

}
