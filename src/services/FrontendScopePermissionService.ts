import { DatabaseService } from '../infrastructure/DatabaseService';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { AutoWired, Container } from 'typescript-ioc';

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

    // TODO: This is more of a findBy...
    async getByScopeId(scopeId: string): Promise<FrontendScopePermission[]> {
        const rows = await this.getWhereFieldEquals('frontendScopeId', scopeId);
        return rows;
    }

    async getByCode(code: string) {
        const query = this.getSelectQuery()
            .where(`permission_code='${code}'`)
            .limit(1);

        const rows = await this.executeQuery<FrontendScopePermission>(query.toString());
        return rows[0];
    }
}
