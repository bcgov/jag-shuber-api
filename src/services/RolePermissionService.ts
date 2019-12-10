import { DatabaseService } from '../infrastructure/DatabaseService';
import { RolePermission } from '../models/RolePermission';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RolePermissionService extends DatabaseService<RolePermission> {
    fieldMap = {
        app_role_permission_id: 'id',
        app_role_id: 'roleId',
        app_role_api_scope_id: 'roleApiScopeId',
        app_role_frontend_scope_id: 'roleFrontendScopeId',
        display_name: 'displayName',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_role_permission', 'app_role_permission_id');
    }
}
