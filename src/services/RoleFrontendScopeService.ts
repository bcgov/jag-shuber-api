import { DatabaseService } from '../infrastructure/DatabaseService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { AutoWired, Container } from 'typescript-ioc';

import { createThrottle } from '../common/throttle';

import { FrontendScopeService } from './FrontendScopeService';
import { FrontendScope } from '../models/FrontendScope';

import { FrontendScopeApiService } from './FrontendScopeApiService';
import { FrontendScopeApi } from '../models/FrontendScopeApi';

import { RoleApiScopeService } from './RoleApiScopeService';
import { RoleApiScope } from '../models/RoleApiScope';

import { RolePermissionService } from './RolePermissionService';
import { RolePermission } from '../models/RolePermission';

import { ApiScopeService } from './ApiScopeService';
import { ApiScope } from '../models/ApiScope';

import {
    DEV_USER_AUTH_ID, DEV_USER_DISPLAY_NAME,
    SYSTEM_USER_DISPLAY_NAME
} from '../common/authentication';

const MAX_RECORDS_PER_BATCH = 3;

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

            return row;
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

    async hasScope(scopeId: string): Promise<boolean> {
        if (!scopeId) return false;
        const rows = await this.getWhereFieldEquals('scopeId', scopeId);
        return (rows && rows.length > 0);
    }

    async getByScopeId(scopeId: string): Promise<RoleFrontendScope[]> {
        const rows = await this.getWhereFieldEquals('scopeId', scopeId);
        return rows;
    }

    /**
     * Override DatabaseService's create method..
     * @param entity
     */
    async create(entity: Partial<RoleFrontendScope>): Promise<RoleFrontendScope> {
        this.validateRoleFrontendScope(entity);

        return await this.db.transaction(async ({ client, getService }) => {
            const query = this.getInsertQuery(entity);
            const rows = await this.executeQuery<RoleFrontendScope>(query.toString());
            
            const roleFrontendScope: RoleFrontendScope = rows[0] as RoleFrontendScope;
            const frontendScopeId = roleFrontendScope.scopeId;
            const roleId = roleFrontendScope.roleId;

            // Add the API scopes required for the frontend scope (component / plugin)
            // What scopes are required? Get the APIs required for the frontend scope
            const apiScopeService = getService<ApiScopeService>(ApiScopeService);
            const roleApiScopeService = getService<RoleApiScopeService>(RoleApiScopeService);
            const frontendScopeApiService = getService<FrontendScopeApiService>(FrontendScopeApiService);
            const frontendScopeApis: FrontendScopeApi[] =await frontendScopeApiService.getByFrontendScopeId(frontendScopeId);

            // Create roleApiScopes
            // Loop over each frontend scope's required apis, and load the apiScopes
            const apiScopes = await Promise.all(frontendScopeApis.map(async (frontendScopeApi: FrontendScopeApi) => {
                // We could use a list of IDs, but loading up the scopes ensures that they are actually available,
                // as there is no direct linkage between RoleApiScopes and FrontendScopeApis
                let apiScope: ApiScope;
                if (frontendScopeApi.apiScopeId && !frontendScopeApi.apiScope) {
                    apiScope = await apiScopeService.getById(frontendScopeApi.apiScopeId);
                } else if (frontendScopeApi.apiScopeId && frontendScopeApi.apiScope) {
                    apiScope = frontendScopeApi.apiScope
                }

                return apiScope;
            })) as ApiScope[];
            
            // Grab all roleApiScopes belonging to the role
            const roleApiScopes = await roleApiScopeService.getByRoleId(roleId);
            await Promise.all(apiScopes.map(async (apiScope: ApiScope) => {
                // If a roleApiScope doesn't exist for the specified apiScope, create one
                const roleHasApiScope = roleApiScopes.find((roleApiScope: RoleApiScope) => roleApiScope.scopeId === apiScope.id);
                if (!roleHasApiScope) {
                    return await roleApiScopeService.create({
                        roleId: roleId,
                        scopeId: apiScope.id,
                        // TODO: Update these with current user
                        createdBy: SYSTEM_USER_DISPLAY_NAME,
                        updatedBy: SYSTEM_USER_DISPLAY_NAME,
                        createdDtm: new Date().toISOString(),
                        updatedDtm: new Date().toISOString(),
                        revisionCount: 0
                        
                    }) as RoleApiScope;
                }

                return apiScope;
            }));

            return roleFrontendScope;
        });
    }

    /**
     * Override DatabaseService's update method.
     * @param entity
     */
    async update(entity: Partial<RoleFrontendScope>): Promise<RoleFrontendScope> {
        this.validateRoleFrontendScope(entity);

        return await this.db.transaction(async ({ client, getService }) => {
            const query = this.getUpdateQuery(entity);
            const rows = await this.executeQuery<RoleFrontendScope>(query.toString());

            // Add, update, or delete the API scopes required for the frontend scope (component / plugin)
            // What scopes are required? Get the APIs required for the frontend scope
            const roleFrontendScope: RoleFrontendScope = rows[0] as RoleFrontendScope;
            const frontendScopeId = roleFrontendScope.scopeId;
            const roleId = roleFrontendScope.roleId;

            // Add the API scopes required for the frontend scope (component / plugin)
            // What scopes are required? Get the APIs required for the frontend scope
            const apiScopeService = getService<ApiScopeService>(ApiScopeService);
            const roleApiScopeService = getService<RoleApiScopeService>(RoleApiScopeService);
            const frontendScopeApiService = getService<FrontendScopeApiService>(FrontendScopeApiService);
            const frontendScopeApis: FrontendScopeApi[] = await frontendScopeApiService.getByFrontendScopeId(frontendScopeId);

            // Loop over each frontend scope's required apis, and load the apiScopes
            const apiScopes = await Promise.all(frontendScopeApis.map(async (frontendScopeApi: FrontendScopeApi) => {
                // We could use a list of IDs, but loading up the scopes ensures that they are actually available,
                // as there is no direct linkage between RoleApiScopes and FrontendScopeApis
                let apiScope: ApiScope;
                if (frontendScopeApi.apiScopeId && !frontendScopeApi.apiScope) {
                    apiScope = await apiScopeService.getById(frontendScopeApi.apiScopeId);
                } else if (frontendScopeApi.apiScopeId && frontendScopeApi.apiScope) {
                    apiScope = frontendScopeApi.apiScope
                }

                return apiScope;
            })) as ApiScope[];
            
            // Grab all roleApiScopes belonging to the role
            const roleApiScopes = await roleApiScopeService.getByRoleId(roleId);
            await Promise.all(apiScopes.map(async (apiScope: ApiScope) => {
                // If a roleApiScope doesn't exist for the specified apiScope, create one
                const roleHasApiScope = roleApiScopes.find((roleApiScope: RoleApiScope) => roleApiScope.scopeId === apiScope.id);
                if (!roleHasApiScope) {
                    return await roleApiScopeService.create({
                        roleId: roleId,
                        scopeId: apiScope.id,
                        // TODO: Update these with current user
                        createdBy: SYSTEM_USER_DISPLAY_NAME,
                        updatedBy: SYSTEM_USER_DISPLAY_NAME,
                        createdDtm: new Date().toISOString(),
                        updatedDtm: new Date().toISOString(),
                        revisionCount: 0
                        
                    }) as RoleApiScope;
                }

                return apiScope;
            }));

            return roleFrontendScope;
        });
    }

    /**
     * Override DatabaseService's delete method.
     * @param id
     */
    async delete(id: string): Promise<void> {
        // Deletes first in their own transaction
        await this.db.transaction(async ({ client, getService }) => {
            const roleFrontendScope: RoleFrontendScope = await this.getById(id) as RoleFrontendScope;

            const rolePermissionService = getService<RolePermissionService>(RolePermissionService);

            const roleScopePermissions: RolePermission[] = await rolePermissionService.getByRoleFrontendScopeId(roleFrontendScope.id);
            // Delete any permissions related to the role scope

            const rspThrottle = createThrottle(1);
            await Promise.all(roleScopePermissions.map((rolePermission: RolePermission) => rspThrottle(async() => {
                try {
                    return await rolePermissionService.delete(rolePermission.id);
                } catch (err) {
                    console.warn(err);
                }
            })));
        });
            
        return await this.db.transaction(async ({ client, getService }) => {
            // Add, update, or delete the API scopes required for the frontend scope (component / plugin)
            // What scopes are required? Get the APIs required for the frontend scope
            const roleFrontendScope: RoleFrontendScope = await this.getById(id) as RoleFrontendScope;
            const frontendScopeId = roleFrontendScope.scopeId;
            const roleId = roleFrontendScope.roleId;

            // Add the API scopes required for the frontend scope (component / plugin)
            // What scopes are required? Get the APIs required for the frontend scope
            const apiScopeService = getService<ApiScopeService>(ApiScopeService);
            const roleApiScopeService = getService<RoleApiScopeService>(RoleApiScopeService);
            
            const frontendScopeApiService = getService<FrontendScopeApiService>(FrontendScopeApiService);
            const frontendScopeApis: FrontendScopeApi[] = await frontendScopeApiService.getByFrontendScopeId(frontendScopeId);

            

            // Loop over each frontend scope's required apis, and load the apiScopes
            const apiScopes = await Promise.all(frontendScopeApis.map(async (frontendScopeApi: FrontendScopeApi) => {
                // We could use a list of IDs, but loading up the scopes ensures that they are actually available,
                // as there is no direct linkage between RoleApiScopes and FrontendScopeApis
                let apiScope: ApiScope;
                if (frontendScopeApi.apiScopeId && !frontendScopeApi.apiScope) {
                    apiScope = await apiScopeService.getById(frontendScopeApi.apiScopeId);
                } else if (frontendScopeApi.apiScopeId && frontendScopeApi.apiScope) {
                    apiScope = frontendScopeApi.apiScope
                }

                return apiScope;
            })) as ApiScope[];
            
            // Grab all roleApiScopes belonging to the role
            const roleApiScopes = await roleApiScopeService.getByRoleId(roleId);
            await Promise.all(apiScopes.map(async (apiScope: ApiScope) => {
                // If a roleApiScope doesn't exist for the specified apiScope, create one
                const roleApiScope = roleApiScopes.find((roleApiScope: RoleApiScope) => roleApiScope.scopeId === apiScope.id);
                if (roleApiScope) {
                    return await roleApiScopeService.delete(roleApiScope.id);
                }
            }));

            const query = this.getDeleteQuery(id);
            await this.executeQuery(query.toString());
        });
    }

    private validateRoleFrontendScope(entity: Partial<RoleFrontendScope>) {
        return true;
    }
}
