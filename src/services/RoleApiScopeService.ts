import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleApiScope } from '../models/RoleApiScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleApiScopeService extends DatabaseService<RoleApiScope> {
    fieldMap = {
        app_role_api_scope_id: 'id',
        app_role_id: 'roleId',
        api_scope_string: 'scopeString',
        api_scope_id: 'scopeId'
        // TODO: Torch the read_only_ind column
    };

    constructor() {
        super('app_role_api_scope', 'app_role_api_scope_id');
    }

}
