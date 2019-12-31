import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { AutoWired, Container } from 'typescript-ioc';

import { FrontendScopeService } from './FrontendScopeService';

@AutoWired
export class RoleFrontendScopeService extends DatabaseService<RoleFrontendScope> {
    fieldMap = {
        app_role_frontend_scope_id: 'id',
        app_role_id: 'roleId',
        // frontend_scope_string: 'scopeString',
        frontend_scope_id: 'scopeId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_role_frontend_scope', 'app_role_frontend_scope_id');
    }

    async getById(id: string): Promise<RoleFrontendScope | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<RoleFrontendScope>(query.toString());

        // Attach roleFrontendScopes and roleApiScopes by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        if (rows && rows.length > 0) {
            let row = rows[0];
            row.scope = await frontendScopeService.getById(row.scopeId);
        }

        return undefined;
    }

    async getByRoleId(roleId: string): Promise<RoleFrontendScope[]> {
        const rows = await this.getWhereFieldEquals('roleId', roleId);
        // Attach roleFrontendScopes and roleFrontendScopes by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        return Promise.all(rows.map(async (row) => {
            row.scope = await frontendScopeService.getById(row.scopeId);
            return row;
        }) as RoleFrontendScope[]);
    }
}
