import moment from 'moment';
import { createToken } from '../infrastructure/token';
import { TokenPayload } from '../common/authentication';
import { AutoWired, Container } from 'typescript-ioc';

import { ApiScopeService } from './ApiScopeService';
import { FrontendScopeService } from './FrontendScopeService';
import { FrontendScopePermissionService } from './FrontendScopePermissionService';
import { UserService } from './UserService';
import { UserRoleService } from './UserRoleService';
import { RoleService } from './RoleService';
import { RolePermissionService } from './RolePermissionService';

import { Scope, Scopes } from '../common/authentication'

import { AppScopePermission } from '../models/AppScope';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { RoleApiScope } from '../models/RoleApiScope';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';
import { RolePermission } from '../models/RolePermission';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { RoleFrontendScopePermission } from '../models/RoleFrontendScopePermission';

/**
 * Import the default system scopes configuration. These scopes, which are embedded in the user token, are required by the
 * frontend application and control which plugins, parts of the user interface, and which APIs a user can have access to.
 */
import { defaultFrontendScopes, defaultApiScopes } from '../common/systemScopes';

import {
    SA_SITEMINDER_ID, SA_AUTH_ID,
    DEV_SA_SITEMINDER_ID, DEV_SA_AUTH_ID,
    TEST_USER_AUTH_ID, TEST_USER_DISPLAY_NAME,
    SYSTEM_USER_DISPLAY_NAME
} from '../common/authentication';

@AutoWired
export class TokenService {
    /**
     * Generates and configures the JSON Web Token that is passed to the frontend application.
     * @param tokenPayload
     */
    async generateToken(tokenPayload: TokenPayload): Promise<any> {
        // Token payload is the request's user object
        // We don't care what that is right now just hard code
        // in a user for now userId is for 'Test User'
        const isDev = true; // TODO: Use ENV VAR
        const userService = Container.get(UserService);
        let user;

        if (!isDev) {
            if (!(tokenPayload && tokenPayload.userId)) {
                throw `No siteminder token provided.`;
            }

            user = await userService.getByToken(tokenPayload);
        } else {
            // We're in DEV mode

            // If siteminder is disabled as the security on the TokenController, we won't have a token / siteminder user to work with
            // Use the built in dummy account (TESTUSR)
            if (!(tokenPayload && tokenPayload.userId)) {
                console.warn(`No siteminder token provided. In production this will throw an error. The message you're seeing is because you're in dev.`);
                user = await this.getOrCreateTestUser();
            } else {
                // If siteminder is enabled as the security on the TokenController, the token will contain a reference to the siteminder user
                // TODO: Tie in ENV vars
                // If the siteminder user doesn't exist and DEV mode is enabled, then create a corresponding user account;
                // then, if the siteminder's user account is whitelisted as an admin via ENV vars (not implemented yet),
                // grant all privileges below...
                user = await this.getOrCreateSiteminderAuthorizedTestUser(tokenPayload);
            }
        }

        if (!user) throw `No user found, cannot continue, exiting.`;

        const apiScopeService = Container.get(ApiScopeService);
        const frontendScopeService = Container.get(FrontendScopeService);

        let authScopes;
        let appScopes;

        if (!isDev) {
            authScopes = await this.buildUserAuthScopes(user.id);
            appScopes = await this.buildUserAppScopes(user.id);
        } else {
            // Generate API Scopes - all system scopes must be present in the DB
            await this.generateApiScopes();
            // Generate Frontend Scopes - all system scopes must be present in the DB
            await this.generateFrontendScopes();

            // Grant all to dev user
            authScopes = await apiScopeService.getAll();
            authScopes = authScopes.reduce((scopes, scope) => {
                scopes.push(scope.scopeCode as Scope);
                return scopes;
            }, ['default'] as Scope[]);
            // Grant all to dev user
            appScopes = await frontendScopeService.getAll();
            appScopes = appScopes.reduce((scopes, scope) => {
                scopes[scope.scopeCode] = true;
                return scopes;
            }, {} as { [key: string]: any });
        }

        const token = await createToken({
            scopes: authScopes as Scope[],
            appScopes: appScopes as { [key: string]: string[] | boolean }[],
            ...tokenPayload
        });

        return token;
    }

    /**
     * Builds a list of OAuth app scopes that are passed to the frontend application using the authorization token.
     * @param userId
     */
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

    /**
     * Builds a list of user app scopes that are passed to the frontend application using the authorization token.
     * @param userId
     */
    private async buildUserAppScopes(userId: string): Promise<any> {
        const userRoleService = Container.get(UserRoleService);
        const userRoles = await userRoleService.getByUserId(userId);

        const roleService = Container.get(RoleService);

        const scopes = await userRoles.reduce(async (asyncUserScopeCodes: Promise<{ [key: string]: AppScopePermission[] | boolean }[]>, ur: UserRole) => {
            let userRoleScopes = await asyncUserScopeCodes;
            // For each UserRole, attach the role
            if (ur && ur.roleId) {
                const role = await roleService.getById(ur.roleId);
                ur.role = role;
                const roleScopes: { [key: string]: string[] }[] = (ur.role && ur.role.roleFrontendScopes)
                    ?  await ur.role.roleFrontendScopes
                        .reduce(async (asyncScopeCodes: Promise<string[]>, cur: RoleFrontendScope) => {
                            let scopeCodes = await asyncScopeCodes;

                            if (cur.scope && cur.scope.scopeCode) {
                                const permissions = await this.buildRoleFrontendScopePermissions(cur, cur.scope)
                                scopeCodes[cur.scope.scopeCode as string] = (permissions instanceof Array && permissions.length > 0) ? permissions : true;
                            }
                            return scopeCodes;
                        }, Promise.resolve([]))
                    : [];

                userRoleScopes = Object.assign({}, userRoleScopes, roleScopes);
            }

            return userRoleScopes;
        }, Promise.resolve({}));

        return scopes;
    }

    /**
     * Build out the permissions configuration for a given role scope.
     */
    private async buildRoleFrontendScopePermissions(roleFrontendScope: RoleFrontendScope, currentScope: FrontendScope): Promise<string[] | boolean> {
        const scopePermissionService = Container.get(FrontendScopePermissionService);
        const rolePermissionService = Container.get(RolePermissionService);

        const scopePermissions = await scopePermissionService.getByScopeId(currentScope.id);
        const assignedPermissions = await rolePermissionService.getByRoleFrontendScopeId(roleFrontendScope.id);

        // If there are no scope permissions for a given scope, just grant access to the scope
        if (scopePermissions.length === 0) {
            return true;
        }

        return scopePermissions
            .map((fsp: FrontendScopePermission) => {
                const roleScopePermission = assignedPermissions.find((ap) => ap.frontendScopePermissionId === fsp.id);
                return (roleScopePermission) ? fsp.permissionCode : undefined;
            })
            .filter(fsp => fsp !== undefined);
    }

    /**
     * Get or create the test user. The test user is only used when developing locally, where a Siteminder user does not
     * exist (unless configured using FakeMinder or some other mock implementation) and is granted full access to
     * frontend plugins and components, user interface features, and all API routes / OAuth scopes.
     */
    private async getOrCreateTestUser(): Promise<User | undefined> {
        // No admin user was found using the token, check to see if the test user account exists
        console.log(`Check to see if the test user account exists`);
        const userService = Container.get(UserService);
        let user = await userService.getByToken({ siteminderId: null, userId: TEST_USER_AUTH_ID });
        if (!user) {
            console.log(`Could not find the test user account - creating a new test account.`);
            user = await userService.create({
                displayName: TEST_USER_DISPLAY_NAME,
                siteminderId: null, // Ignore, we won't have one
                userAuthId: TEST_USER_AUTH_ID, // 7 chars, same as IDIR
                defaultLocationId: '65b2e8fb-0d64-4f63-853c-76d8d359760e', // GUID Set a default location for the user
                systemAccountInd: 0, // Is the user a system user
                sheriffId: null, // If the user is a sheriff, this needs to be populated
                createdBy: SYSTEM_USER_DISPLAY_NAME,
                updatedBy: SYSTEM_USER_DISPLAY_NAME,
                createdDtm: moment(new Date()).toISOString(),
                updatedDtm: moment(new Date()).toISOString(),
                revisionCount:0
            } as User);
            console.log(`Using user account: ${user.displayName} [${user.id}]`);
        }

        return user;
    }

    /**
     * Get or create a test user account for a given Siteminder user who has been granted access to the system. This
     * account is granted full access to frontend plugins and components, user interface features, and all API
     * routes / OAuth scopes, and represents what a Super Administrator or Top Level Administrator would have access to.
     */
    private async getOrCreateSiteminderAuthorizedTestUser(tokenPayload: TokenPayload): Promise<User | undefined> {
        // No admin user was found using the token, check to see if the test user account exists
        console.log(`Check to see if the test user account exists`);
        const userService = Container.get(UserService);
        let user = await userService.getByToken(tokenPayload);
        if (!user) {
            console.log(`Could not find the test user's account - creating a new test account.`);
            user = await userService.create({
                displayName: tokenPayload.displayName,
                siteminderId: tokenPayload.guid,
                userAuthId: tokenPayload.userId,
                defaultLocationId: '65b2e8fb-0d64-4f63-853c-76d8d359760e', // GUID Set a default location for the user
                systemAccountInd: 0, // Is the user a system user
                sheriffId: null, // If the user is a sheriff, this needs to be populated
                createdBy: SYSTEM_USER_DISPLAY_NAME,
                updatedBy: SYSTEM_USER_DISPLAY_NAME,
                createdDtm: moment(new Date()).toISOString(),
                updatedDtm: moment(new Date()).toISOString(),
                revisionCount:0
            } as User);

        }

        console.log(`Using test user account: ${user.displayName} [${user.id}]`);
        console.log(user);
        return user;
    }

    /**
     * Re-generate any ApiScopes that are required by and missing in the system.
     * Default scopes are defined in src/common/systemScopes.ts
     */
    private async generateApiScopes() {
        const scopeService = Container.get(ApiScopeService);
        const ops = defaultApiScopes.map(async (scope: ApiScope) => {
            if (!(await scopeService.getByScopeCode(scope.scopeCode))) {
                return await scopeService.create(scope);
            }
        })

        await Promise.all(ops);
    }

    /**
     * Re-generate any FrontendScopes that are required by and missing in the system.
     * Default scopes are defined in src/common/systemScopes.ts
     */
    private async generateFrontendScopes() {
        const scopeService = Container.get(FrontendScopeService);
        const ops = defaultFrontendScopes.map(async (scope: FrontendScope) => {
            if (!(await scopeService.getByScopeCode(scope.scopeCode))) {
                return await scopeService.create(scope);
            }
        })

        await Promise.all(ops);
    }
}
