import { DatabaseService } from '../infrastructure/DatabaseService';
import { Role } from '../models/Role';
import { AutoWired, Container } from 'typescript-ioc';

import { RoleFrontendScopeService } from './RoleFrontendScopeService';
import { RoleApiScopeService } from './RoleApiScopeService';

@AutoWired
export class RoleService extends DatabaseService<Role> {
    fieldMap = {
        app_role_id: 'id',
        app_role_name: 'roleName',
        app_role_code: 'roleCode',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_role', 'app_role_id');
    }

    async getById(id: string): Promise<Role | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<Role>(query.toString());

        // Attach roleFrontendScopes and roleApiScopes by default for convenience
        const roleFrontendScopeService = Container.get(RoleFrontendScopeService);
        const roleApiScopeService = Container.get(RoleApiScopeService);
        if (rows && rows.length > 0) {
            let row = rows[0] as Role;
            row.roleFrontendScopes = await roleFrontendScopeService.getByRoleId(row.id);
            row.roleApiScopes = await roleApiScopeService.getByRoleId(row.id);

            return row;
        }

        return undefined;
    }
}
