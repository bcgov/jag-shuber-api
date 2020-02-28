import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { AutoWired, Container } from 'typescript-ioc';

import { FrontendScopeService } from './FrontendScopeService';
import { FrontendScope } from '../models/FrontendScope';

@AutoWired
export class RoleFrontendScopeService extends DatabaseService<RoleFrontendScope> {
    fieldMap = {
        role_frontend_scope_id: 'id',
        role_id: 'roleId',
        // frontend_scope_string: 'scopeString',
        frontend_scope_id: 'scopeId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('auth_role_frontend_scope', 'role_frontend_scope_id');
    }

    async getById(id: string): Promise<RoleFrontendScope | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<RoleFrontendScope>(query.toString());

        // Attach FrontendScope by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        if (rows && rows.length > 0) {
            let row = rows[0];
            row.scope = await frontendScopeService.getById(row.scopeId);
        }

        return undefined;
    }

    async getByRoleId(roleId: string): Promise<RoleFrontendScope[]> {
        const rows = await this.getWhereFieldEquals('roleId', roleId);
        // Attach FrontendScope by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        return Promise.all(rows.map(async (row) => {
            row.scope = await frontendScopeService.getById(row.scopeId);
            return row;
        }) as RoleFrontendScope[]);
    }

    async hasScope(scope: FrontendScope): Promise<boolean> {
        if (!scope) return false;
        const rows = await this.getWhereFieldEquals('scopeId', scope.id);
        return (rows && rows.length > 0);
    }
}
