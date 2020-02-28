import { DatabaseService } from '../infrastructure/DatabaseService';
import { RolePermission } from '../models/RolePermission';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { AutoWired, Container } from 'typescript-ioc';

import { FrontendScopePermissionService } from './FrontendScopePermissionService';

@AutoWired
export class RolePermissionService extends DatabaseService<RolePermission> {
    fieldMap = {
        role_permission_id: 'id',
        role_id: 'roleId',
        role_api_scope_id: 'roleApiScopeId',
        role_frontend_scope_id: 'roleFrontendScopeId',
        api_scope_permission_id: 'apiScopePermissionId',
        frontend_scope_permission_id: 'frontendScopePermissionId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('auth_role_permission', 'role_permission_id');
    }

    async getByRoleFrontendScopeId(roleFrontendScopeId: string): Promise<FrontendScopePermission[]> {
        return await this.getWhereFieldEquals('roleFrontendScopeId', roleFrontendScopeId);
    }
}
