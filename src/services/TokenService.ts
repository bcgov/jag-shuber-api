import { createToken } from '../infrastructure/token';
import { TokenPayload } from '../common/authentication';
import { AutoWired, Container } from 'typescript-ioc';

import { ApiScopeService } from './ApiScopeService';
import { FrontendScopeService } from './FrontendScopeService';
import { FrontendScopePermissionService } from '../services/FrontendScopePermissionService';
import { UserService } from '../services/UserService';
import { UserRoleService } from '../services/UserRoleService';
import { RoleService } from '../services/RoleService';
import { RolePermissionService } from './RolePermissionService';

import { Scope, Scopes } from '../common/authentication'

import { UserRole } from '../models/UserRole';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { RoleApiScope } from '../models/RoleApiScope';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';
import { RolePermission } from '../models/RolePermission';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { RoleFrontendScopePermission } from '../models/RoleFrontendScopePermission';

const TEST_USER_ID = 'd9772aab-6e5e-4b41-87b2-3294009e6d28';

@AutoWired
export class TokenService {
    async generateToken(tokenPayload: TokenPayload): Promise<any> {
        // Token payload is the request's user object
        // We don't care what that is right now just hard code in a user for now
        // userId is for 'Test User'
        const userId = (tokenPayload && tokenPayload.userId) 
            ? tokenPayload.userId 
            : TEST_USER_ID;  // Test User ID

        const apiScopeService = Container.get(ApiScopeService);

        if (!tokenPayload || (tokenPayload.userId !== TEST_USER_ID)) {
            console.log('-----------------------------------------------------------------------------------------------------------');
            console.log(`Notice! No siteminder user detected, granting all roles to Test User [${TEST_USER_ID}]`);
            console.log('-----------------------------------------------------------------------------------------------------------');
        }

        let authScopes;
        
        if (tokenPayload && tokenPayload.userId) {
            authScopes = await this.buildUserAuthScopes(userId)
        } else {
            authScopes = await apiScopeService.getAll();
            authScopes = authScopes.reduce((scopes, scope) => {
                scopes.push(scope.scopeCode as Scope); 
                return scopes;
            }, ['default'] as Scope[]);
        }

        const appScopes = await this.buildUserAppScopes(userId);
        if (!tokenPayload || (tokenPayload.userId !== TEST_USER_ID)) {
            console.log(`Test User [${TEST_USER_ID}] OAuth scopes`);
            console.log(authScopes);
            console.log(appScopes);
        }

        const token = await createToken({
            scopes: authScopes as Scope[],
            appScopes: appScopes,
            ...tokenPayload
        });

        // console.log(`User [${userId}] token payload`);
        // console.log(tokenPayload);

        // console.log(`User [${userId}] token`);
        // console.log(token);
        return token;
    }

    private async buildUserAuthScopes(userId: string): Promise<Scope[]> {
        const userRoleService = Container.get(UserRoleService);
        const userRoles = await userRoleService.getByUserId(userId);

        const roleService = Container.get(RoleService);
        
        const scopes = await userRoles.reduce(async (userScopeCodes: Promise<Scope[]>, ur: UserRole) => {
            let results = await userScopeCodes;
            // For each UserRole, attach the role
            if (ur && ur.roleId) {
                const role = await roleService.getById(ur.roleId);
                // RoleFrontendScopes and RoleApiScopes will be populated
                // Let's loop over the RoleApiScopes
                ur.role = role;
                const roleScopeCodes: Scope[] = (ur.role && ur.role.roleApiScopes) 
                    ? ur.role.roleApiScopes
                        .reduce((scopeCodes: Scope[], cur: RoleApiScope) => {
                            if (cur.scope && cur.scope.scopeCode) {
                                scopeCodes.push(cur.scope.scopeCode as Scope);
                            }
                            return scopeCodes;
                        }, [])

                    : [];

                if (roleScopeCodes.length > 0) {
                    return results.concat(roleScopeCodes as Scope[]);
                }
            }

            return userScopeCodes;
        }, Promise.resolve(['default'] as Scope[]));

        return scopes;
    }

    private async buildUserAppScopes(userId: string): Promise<any> {
        const userRoleService = Container.get(UserRoleService);
        const userRoles = await userRoleService.getByUserId(userId);

        const roleService = Container.get(RoleService);
        
        const scopes = await userRoles.reduce(async (asyncUserScopeCodes: Promise<{ [key: string]: string }[]>, ur: UserRole) => {
            let userScopeCodes = await asyncUserScopeCodes;
            // For each UserRole, attach the role
            if (ur && ur.roleId) {
                const role = await roleService.getById(ur.roleId);
                ur.role = role;
                const roleScopes: { [key: string]: string }[] = (ur.role && ur.role.roleFrontendScopes) 
                    ?  await ur.role.roleFrontendScopes
                        .reduce(async (asyncScopeCodes: Promise<string[]>, cur: RoleFrontendScope) => {
                            let scopeCodes = await asyncScopeCodes;

                            if (cur.scope && cur.scope.scopeCode) {
                                const permissions = await this.buildRoleFrontendScopePermissions(cur, cur.scope)
                                scopeCodes[cur.scope.scopeCode as string] = (permissions.length > 0) ? permissions : true;
                            }
                            return scopeCodes;
                        }, Promise.resolve([]))
                    : [];

                if (Object.keys(roleScopes).length > 0) {
                    return Object.assign({}, userScopeCodes, roleScopes);
                }
            }

            return userScopeCodes;
        }, Promise.resolve({}));

        // console.log(scopes);
        return scopes;
    }

    
    /** 
     * Build out the permissions configuration for a given role scope.
     */
    private async buildRoleFrontendScopePermissions(roleFrontendScope: RoleFrontendScope, currentScope: FrontendScope): Promise<any[]> {
        const scopePermissionService = Container.get(FrontendScopePermissionService);
        const rolePermissionService = Container.get(RolePermissionService);
    
        const scopePermissions = await scopePermissionService.getByScopeId(currentScope.id);
        const assignedPermissions = await rolePermissionService.getByRoleFrontendScopeId(roleFrontendScope.id);

        return scopePermissions.map((fsp: FrontendScopePermission): RoleFrontendScopePermission => {
            // RolePermission doesn't have a frontendScopeId or a scopeId reference directly on it.
            // This is by design.
            // We basically just apply a RolePermission - if it exists - on top of a RoleFrontendScopePermission,
            // which combines the FrontendScopePermission and RolePermission shapes, and which is also the actual
            // model used by the UI in redux-form FormArrays.
            let roleScopePermission = assignedPermissions.find((ap) => ap.frontendScopePermissionId === fsp.id) as RoleFrontendScopePermission;

            let hasPermission = false;
            if (roleScopePermission && roleScopePermission.id) {
                hasPermission = true;
            } else {
                roleScopePermission = {} as RoleFrontendScopePermission;
            }

            roleScopePermission.roleId = roleFrontendScope.roleId;
            roleScopePermission.roleFrontendScopeId = roleFrontendScope.id;
            roleScopePermission.frontendScopePermissionId = fsp.id;
            roleScopePermission.displayName = fsp.displayName;
            roleScopePermission.description = fsp.description;
            roleScopePermission.hasPermission = hasPermission;
            // roleScopePermission.scope = currentScope;
            // roleScopePermission.roleScope = roleFrontendScope;
            // roleScopePermission.scopePermission = fsp;

            return {
                ...roleScopePermission,
                ...fsp
            };
        });
    }
}