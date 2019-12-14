import { DatabaseService } from '../infrastructure/DatabaseService';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class FrontendScopePermissionService extends DatabaseService<FrontendScopePermission> {
    fieldMap = {
        frontend_scope_permission_id: 'id',
        frontend_scope_id: 'frontendScopeId',
        permission_code: 'permissionCode',
        display_name: 'displayName',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('frontend_scope_permission', 'frontend_scope_permission_id');
    }
}
