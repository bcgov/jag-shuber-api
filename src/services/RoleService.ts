import { DatabaseService } from '../infrastructure/DatabaseService';
import { Role } from '../models/Role';
import { AutoWired, Container } from 'typescript-ioc';

import { RoleFrontendScopeService } from './RoleFrontendScopeService';
import { RoleApiScopeService } from './RoleApiScopeService';

@AutoWired
export class RoleService extends DatabaseService<Role> {
    fieldMap = {
        role_id: 'id',
        role_name: 'roleName',
        role_code: 'roleCode',
        system_role_ind: 'systemRoleInd',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('auth_role', 'role_id');
    }

    async getAll() {
        const query = super.getSelectQuery();
        query.order(`system_role_ind = '1' DESC, role_code`)
        const rows = await this.executeQuery<Role>(query.toString());
        return rows;
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

    async getByCode(code: string) {
        const query = this.getSelectQuery()
            .where(`role_code='${code}'`)
            .limit(1);

        let rows = await this.executeQuery<Role>(query.toString());
        
        // Attach roleFrontendScopes and roleApiScopes by default for convenience
        const roleFrontendScopeService = Container.get(RoleFrontendScopeService);
        const roleApiScopeService = Container.get(RoleApiScopeService);
        if (rows && rows.length > 0) {
            rows = await Promise.all(rows.map(async (row: Role) => {
                row.roleFrontendScopes = await roleFrontendScopeService.getByRoleId(row.id);
                row.roleApiScopes = await roleApiScopeService.getByRoleId(row.id);
                return row;
            }));
        }

        return rows[0];
    }
}
