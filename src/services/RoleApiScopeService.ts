import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleApiScope } from '../models/RoleApiScope';
import { AutoWired, Container } from 'typescript-ioc';

import { ApiScopeService } from './ApiScopeService';

@AutoWired
export class RoleApiScopeService extends DatabaseService<RoleApiScope> {
    fieldMap = {
        app_role_api_scope_id: 'id',
        app_role_id: 'roleId',
        // api_scope_string: 'scopeString',
        api_scope_id: 'scopeId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_role_api_scope', 'app_role_api_scope_id');
    }

    async getById(id: string): Promise<RoleApiScope | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<RoleApiScope>(query.toString());

        // Attach ApiScope by default for convenience
        const apiScopeService = Container.get(ApiScopeService);
        if (rows && rows.length > 0) {
            let row = rows[0];
            row.scope = await apiScopeService.getById(row.scopeId);
        }

        return undefined;
    }

    async getByRoleId(roleId: string): Promise<RoleApiScope[]> {
        const rows = await this.getWhereFieldEquals('roleId', roleId);
        // Attach ApiScope by default for convenience
        const apiScopeService = Container.get(ApiScopeService);
        return Promise.all(rows.map(async (row) => {
            row.scope = await apiScopeService.getById(row.scopeId);
            return row;
        }) as RoleApiScope[]);
    }
}
