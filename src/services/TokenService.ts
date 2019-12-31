import { createToken } from '../infrastructure/token';
import { TokenPayload } from '../common/authentication';
import { AutoWired, Container } from 'typescript-ioc';

import { UserService } from '../services/UserService';
import { UserRoleService } from '../services/UserRoleService';
import { RoleService } from '../services/RoleService';

import { Scope, Scopes } from '../common/authentication'

import { UserRole } from '../models/UserRole';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { RoleApiScope } from '../models/RoleApiScope';
import { ApiScopeService } from './ApiScopeService';

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
        }

        const token = await createToken({
            scopes: authScopes as Scope[],
            appScopes: appScopes as string[],
            ...tokenPayload
        });

        // console.log(`User [${userId}] token payload`);
        // console.log(tokenPayload);

        // console.log(`User [${userId}] token`);
        // console.log(token);
        return token;
    }

    private async buildUserAppScopes(userId: string): Promise<any> {
        const userRoleService = Container.get(UserRoleService);
        const userRoles = await userRoleService.getByUserId(userId);

        const roleService = Container.get(RoleService);
        
        const scopes = await userRoles.reduce(async (userScopeCodes: Promise<string[]>, ur: UserRole) => {
            let results = await userScopeCodes;
            // For each UserRole, attach the role
            if (ur && ur.roleId) {
                const role = await roleService.getById(ur.roleId);
                // RoleFrontendScopes and RoleApiScopes will be populated
                // Let's loop over the RoleApiScopes
                ur.role = role;
                const roleScopeCodes: string[] = (ur.role && ur.role.roleFrontendScopes) 
                    ? ur.role.roleFrontendScopes
                        .reduce((scopeCodes: string[], cur: RoleFrontendScope) => {
                            if (cur.scope && cur.scope.scopeCode) {
                                scopeCodes.push(cur.scope.scopeCode as string);
                            }
                            return scopeCodes;
                        }, [])

                    : [];

                if (roleScopeCodes.length > 0) {
                    return results.concat(roleScopeCodes as string[]);
                }
            }

            return userScopeCodes;
        }, Promise.resolve(['DEFAULT'] as string[]));

        return scopes;
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
}