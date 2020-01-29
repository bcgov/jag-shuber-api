import moment from 'moment';
import { createToken } from '../infrastructure/token';
import { TokenPayload } from '../common/authentication';
import { AutoWired, Container } from 'typescript-ioc';

import { GeneratorService } from './GeneratorService';
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

const PRODUCTION_MODE = process.env.SYS_PRODUCTION_MODE === 'true' ? true : false
const GRANT_ALL_SCOPES = process.env.SYS_GRANT_ALL_SCOPES === 'false' ? false : true
const USE_SITEMINDER = process.env.SYS_USE_SITEMINDER === 'false' ? false : true

const DEFAULT_LOCATION = process.env.SYS_DEFAULT_LOCATION; // A default location CODE (GUID is useless since it's different across different environments and we don't know what they are until they're generated)
// for new sheriffs and users if none are defined. Used internally and under the hood by TokenService and GeneratorService.

import {
    FAKEMINDER_IDIR, FAKEMINDER_GUID,
    SA_SITEMINDER_ID, SA_AUTH_ID,
    DEV_SA_SITEMINDER_ID, DEV_SA_AUTH_ID,
    DEV_USER_AUTH_ID, DEV_USER_DISPLAY_NAME,
    SYSTEM_USER_DISPLAY_NAME
} from '../common/authentication';
import { LocationService } from './LocationService';

export interface TokenServiceConfig {
    PRODUCTION_MODE: boolean,
    GRANT_ALL_SCOPES: boolean,
    USE_SITEMINDER: boolean,
    DEFAULT_LOCATION: string,
    SA_AUTH_ID: string,
    DEV_SA_AUTH_ID: string
}

@AutoWired
export class TokenService {
    config: TokenServiceConfig
    
    setConfig(config: TokenServiceConfig) {
        this.config = config;
    }

    /**
     * Generates and configures the JSON Web Token that is passed to the frontend application.
     * @param tokenPayload
     */
    async generateToken(tokenPayload: TokenPayload): Promise<any> {
        const user = this.getTokenUser(tokenPayload);

        const { authScopes, appScopes } = await this.buildUserScopes(user);

        const token = await createToken({
            scopes: authScopes as Scope[],
            appScopes: appScopes as { [key: string]: string[] | boolean }[],
            ...tokenPayload
        });

        return token;
    }

    async getTokenUser(tokenPayload: TokenPayload) {
        let user;
        if (PRODUCTION_MODE) {
            // If we're NOT in DEV mode, we require a siteminder token
            if (!(tokenPayload && tokenPayload.userId)) {
                throw `No siteminder token provided.`;
            }

            const userService = Container.get(UserService);
            user = await userService.getByToken(tokenPayload);

            if (user) console.log(`User exists! Display Name: ${user.displayName}, Auth ID: ${user.userAuthId}`);
        } else if (!PRODUCTION_MODE) {
            // We're in DEV mode
            user = await this.getOrCreateDevUser(tokenPayload);
        }

        if (!user) throw `No user found, cannot continue, exiting.`;

        return user;
    }

    static isSuperAdmin(user): boolean {
        return (PRODUCTION_MODE) 
            ? TokenService.isProdSuperAdmin(user)
            : TokenService.isDevSuperAdmin(user)
    }

    static isDevSuperAdmin(user): boolean {
        // Prefer siteminder ID if it's available
        let isSuperAdmin = (DEV_SA_SITEMINDER_ID && user.siteminderId && (user.siteminderId === DEV_SA_SITEMINDER_ID));
        if (!isSuperAdmin && DEV_SA_AUTH_ID) {
            // Is the SA_AUTH_ID a comma-separated list of IDIRs?
            const isList = /,/g.test(DEV_SA_AUTH_ID);
            if (isList) {
                const saIds = DEV_SA_AUTH_ID.split(',').map(id => id.trim());
                isSuperAdmin = (DEV_SA_AUTH_ID && user.userAuthId && (saIds.indexOf(user.userAuthId) > -1));
            } else {
                isSuperAdmin = (DEV_SA_AUTH_ID && user.userAuthId && (user.userAuthId === DEV_SA_AUTH_ID));
            }
        }

        return isSuperAdmin;
    }

    static isProdSuperAdmin(user): boolean {
        // Prefer siteminder ID if it's available
        let isSuperAdmin = (SA_SITEMINDER_ID && user.siteminderId && (user.siteminderId === SA_SITEMINDER_ID));
        if (!isSuperAdmin && SA_AUTH_ID) {
            // Is the SA_AUTH_ID a comma-separated list of IDIRs?
            const isList = /,/g.test(SA_AUTH_ID);
            if (isList) {
                const saIds = SA_AUTH_ID.split(',').map(id => id.trim());
                isSuperAdmin = (SA_AUTH_ID && user.userAuthId && (saIds.indexOf(user.userAuthId) > -1));
            } else {
                isSuperAdmin = (SA_AUTH_ID && user.userAuthId && (user.userAuthId === SA_AUTH_ID));
            }
        }

        return isSuperAdmin;
    }

    async buildUserScopes(user) {
        if (!user) {
            console.log("Uh oh, we shouldn't be building user scopes for a user that doesn't exist!");
            return;
        }

        const isSuperAdmin = TokenService.isSuperAdmin(user);
        let authScopes;
        let appScopes;
        
        if (!PRODUCTION_MODE || (isSuperAdmin || GRANT_ALL_SCOPES)) {
            if (!PRODUCTION_MODE) console.log('PRODUCTION_MODE is disabled in OpenShift');
            if (GRANT_ALL_SCOPES) console.log('GRANT_ALL_SCOPES is enabled in OpenShift');
            if (isSuperAdmin) console.log('User is configured as the Super Admin, granting all scopes');
            // If the user is the SA or GRANT_ALL_SCOPES is true grant all scopes to the user
            authScopes = await this.buildSuperAdminAuthScopes();
            appScopes = await this.buildSuperAdminAppScopes();
        } else {
            console.log('Building user auth scopes');
            authScopes = await this.buildUserAuthScopes(user.id);
            appScopes = await this.buildUserAppScopes(user.id);
        }

        return { authScopes, appScopes };
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

    private async buildSuperAdminAuthScopes() {
        const apiScopeService = Container.get(ApiScopeService);
        // Grant all to dev user
        const authScopes = await apiScopeService.getAll();
        return authScopes.reduce((scopes, scope) => {
            scopes.push(scope.scopeCode as Scope);
            return scopes;
        }, ['default'] as Scope[]);
    }

    private async buildSuperAdminAppScopes() {
        const frontendScopeService = Container.get(FrontendScopeService);
        // Grant all to dev user
        const appScopes = await frontendScopeService.getAll();
        return appScopes.reduce((scopes, scope) => {
            scopes[scope.scopeCode] = true;
            return scopes;
        }, {} as { [key: string]: any });
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

    private async getOrCreateDevUser(tokenPayload: TokenPayload): Promise<User> {
        let user: User;

        const generatorService = Container.get(GeneratorService);
        // If we're developing locally, and TokenController.getToken DOES NOT HAVE siteminder specified as the auth handler 
        // we won't have a token / siteminder user to work with so use the built-in TESTUSR dummy account 
        if (!PRODUCTION_MODE && !(tokenPayload && tokenPayload.userId)) {
            console.warn(`No siteminder token provided. In production this will throw an error. The message you're seeing is because you're in dev.`);
            user = await generatorService.getOrCreateDevUser();
        } else if (!PRODUCTION_MODE && USE_SITEMINDER) { 
            // If we're developing locally, and TokenController.getToken HAS siteminder specified as the auth handler
            // the siteminder token will be provided by FakeMinder in which case the token payload will look like:
            // { displayName: "Name, Your", guid: "SOMEGUIDGOESHERE", type: "user", userId: "yname" }
            if ((tokenPayload.guid === FAKEMINDER_GUID) || (tokenPayload.userId === FAKEMINDER_IDIR)) {
                user = await generatorService.getOrCreateDevUser();
            } else {
                // If this application is deployed to the BC Gov DEV environment, TokenController.getToken WILL have siteminder 
                // specified as the auth handler and the token payload will look like:
                // { displayName: "<DISPLAYNAME>", guid: "<SITEMINDER_ID>", type: "<INTERNAL | EXTERNAL>", userId: "<YOUR_IDIR>" }
                user = await this.getOrCreateSiteminderAuthorizedUser(tokenPayload);
            }   
        }

        return user;
    }

    /**
     * Get or create a test user account for a given Siteminder user who has been granted access to the system. This
     * account is granted full access to frontend plugins and components, user interface features, and all API
     * routes / OAuth scopes, and represents what a Super Administrator or Top Level Administrator would have access to.
     */
    private async getOrCreateSiteminderAuthorizedUser(tokenPayload: TokenPayload): Promise<User | undefined> {
        // No admin user was found using the token, check to see if the test user account exists
        console.log(`Check to see if the test user account exists`);
        const userService = Container.get(UserService);
        let user = await userService.getByToken(tokenPayload);
        if (!user) {
            const locationService = Container.get(LocationService);
            const locationId = locationService.getByCode(DEFAULT_LOCATION);
            console.log(`Could not find the test user's account - creating a new test account.`);
            user = await userService.create({
                displayName: tokenPayload.displayName,
                siteminderId: tokenPayload.guid,
                userAuthId: tokenPayload.userId,
                // TODO: Ability to configure this would be useful...
                defaultLocationId: locationId, // GUID TODO: Set a default location for the user and make it configurable via OpenShift
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
}
