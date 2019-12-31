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

@AutoWired
export class TokenService {
    async generateToken(tokenPayload: TokenPayload): Promise<any> {
        // Token payload is the request's user object
        // We don't care what that is right now just hard code in a user for now
        // userId is for 'Test User'
        const userId = 'd9772aab-6e5e-4b41-87b2-3294009e6d28'; // tokenPayload.userId;
        const userService = Container.get(UserService);
        const user = await userService.getById(userId);

        const authScopes = await this.buildUserAuthScopes(userId);
        // console.log(`User [${userId}] OAuth scopes`);
        // console.log(authScopes);

        return createToken({
            scopes: authScopes as Scope[],
            ...tokenPayload
        });
    }

    private async buildUserFrontendScopes(userId: string): Promise<any> {
        const userRoleService = Container.get(UserRoleService);
        const userRoles = await userRoleService.getByUserId(userId);

        const roleService = Container.get(RoleService);
        
        const scopes = Promise.all(userRoles.map(async (ur: UserRole) => {
            // For each UserRole, attach the role
            if (ur && ur.roleId) {
                ur.role = await roleService.getById(ur.roleId);
                // RoleFrontendScopes and RoleApiScopes will be populated
                // Let's loop over the RoleFrontendScopes
                
            }
        }));
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