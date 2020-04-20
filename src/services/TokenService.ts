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
import { RoleApiScopeService } from './RoleApiScopeService';
import { RoleFrontendScopeService } from './RoleFrontendScopeService';
import { RolePermissionService } from './RolePermissionService';

import { Scope, Scopes } from '../common/authentication'

import { AppScopePermission } from '../models/AppScope';
import { User } from '../models/User';
import { UserRole } from '../models/UserRole';
import { Role } from '../models/Role';
import { RoleFrontendScope } from '../models/RoleFrontendScope';
import { RoleApiScope } from '../models/RoleApiScope';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';
import { RolePermission } from '../models/RolePermission';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { RoleFrontendScopePermission } from '../models/RoleFrontendScopePermission';

import { DEV_USER_AUTH_ID, DEV_USER_TEST_ROLES, USER_DEFAULT_ROLES } from '../common/authentication';

const PRODUCTION_MODE = process.env.SYS_PRODUCTION_MODE === 'true' ? true : false
const GRANT_ALL_SCOPES = process.env.SYS_GRANT_ALL_SCOPES === 'true' ? true : false
const USE_SITEMINDER = process.env.SYS_USE_SITEMINDER === 'false' ? false : true

const DEFAULT_LOCATION = process.env.SYS_DEFAULT_LOCATION; // A default location CODE (GUID is useless since it's different across different environments and we don't know what they are until they're generated)
// for new sheriffs and users if none are defined. Used internally and under the hood by TokenService and GeneratorService.

const SYSADMIN_ROLE_CODE = 'SYSADMIN';

const USE_DEV_USER = false; // Use this to force the system to use the DEV user when testing auth scopes locally. Set to false if not in use!
const FORCE_PRODUCTION_MODE = undefined; // Use this to force production mode, which is needed to test auth scopes locally; set to undefined if not in use!

import {
    FAKEMINDER_IDIR, FAKEMINDER_GUID,
    SA_AUTH_ID,
    DEV_SA_AUTH_ID,
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
        // console.log('generating auth token');
        // console.log(tokenPayload);
        const user = await this.getTokenUser(tokenPayload);

        const { authScopes, appScopes } = await this.buildUserScopes(user);

        const token = await createToken({
            scopes: authScopes as Scope[],
            appScopes: appScopes as { [key: string]: string[] | boolean }[],
            ...tokenPayload
        });

        return token;
    }

    async getTokenUser(tokenPayload: TokenPayload) {
        const isProductionMode = FORCE_PRODUCTION_MODE || PRODUCTION_MODE;
        let user;
        if (isProductionMode) {
            if (USE_DEV_USER) {
                // Override the siteminder token, use the dev user
                tokenPayload.userId = DEV_USER_AUTH_ID;
            }
            // If we're NOT in DEV mode, we require a siteminder token
            if (!(tokenPayload && tokenPayload.userId)) {
                throw `No siteminder token provided.`;
            }

            const userService = Container.get(UserService);
            user = await userService.getByToken(tokenPayload);

            if (user) {
                console.log(`User exists! Display Name: ${user.displayName}, Auth ID: ${user.userAuthId}`);
            }
        } else if (!isProductionMode) {
            // We're in DEV mode
            user = await this.getOrCreateDevUser(tokenPayload);
        }

        if (!user) throw `No user found, cannot continue, exiting.`;

        return user;
    }

    static isSuperAdmin(user): boolean {
        return (TokenService.isDevSuperAdmin(user) || TokenService.isMasterSuperAdmin(user));
    }

    static isDevSuperAdmin(user): boolean {
        let isSuperAdmin = false;
        if (DEV_SA_AUTH_ID) {
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

    static isMasterSuperAdmin(user): boolean {
        let isSuperAdmin = false;
        if (SA_AUTH_ID) {
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
        const isProductionMode = FORCE_PRODUCTION_MODE || PRODUCTION_MODE;
        const grantAllScopes = GRANT_ALL_SCOPES;

        let authScopes;
        let appScopes;

        if (!user) {
            console.log("Uh oh, we shouldn't be building user scopes for a user that doesn't exist!");
            return { authScopes, appScopes };
        }

        const isSuperAdmin = TokenService.isSuperAdmin(user);
        const isDevSuperAdmin = TokenService.isDevSuperAdmin(user);
        
        if (!isProductionMode || (isSuperAdmin || grantAllScopes)) {
            if (grantAllScopes) console.log('GRANT_ALL_SCOPES is enabled, granting all scopes to all users');

            if (!isProductionMode) console.log(`PRODUCTION_MODE is disabled, granting all scopes to ${user.displayName}`);
            
            // Are we using the test user account?
            if (user.userAuthId === DEV_USER_AUTH_ID) {
                // If so allow use the configured TEST ROLE
                console.log(`Granting test scopes to ${user.displayName}`);
                console.log(`Building auth scopes for ${user.displayName} [${user.id}]`);
                console.log(user);
                if (DEV_USER_TEST_ROLES.indexOf(SYSADMIN_ROLE_CODE) > -1) {
                    console.log(`The current user is a Super Admin, granting all scopes to ${user.displayName}`);
                    // If the user is the SA or GRANT_ALL_SCOPES is true grant all regular scopes to the user
                    authScopes = await this.buildSuperAdminAuthScopes(true);
                    appScopes = await this.buildSuperAdminAppScopes(true);     
                } else {
                    authScopes = await this.buildAuthScopes(user.id, DEV_USER_TEST_ROLES);
                    console.log('Auth scopes:');
                    console.log(authScopes);
                    appScopes = await this.buildAppScopes(user.id, DEV_USER_TEST_ROLES);
                    console.log('App scopes:');
                    console.log(appScopes);
                }
            } else if (isSuperAdmin) {
                console.log(`The current user is a Super Admin, granting all scopes to ${user.displayName}`);
                // If the user is the SA or GRANT_ALL_SCOPES is true grant all regular scopes to the user
                authScopes = await this.buildSuperAdminAuthScopes(isDevSuperAdmin);
                appScopes = await this.buildSuperAdminAppScopes(isDevSuperAdmin);          
            }
        } else {
            console.log('---------------------------------------------------------');
            console.log(`Building auth scopes for ${user.displayName} [${user.id}]`);
            console.log(user);
            
            // Build any default user scopes
            authScopes = await this.buildAuthScopes(user.id, USER_DEFAULT_ROLES) || [];
            console.log('Adding default user auth scopes:');
            console.log(authScopes);
            appScopes = await this.buildAppScopes(user.id, USER_DEFAULT_ROLES);
            console.log('Adding default user app scopes:');
            console.log(appScopes);

            // Build configured user scopes - these are added to the defaults
            const configuredAuthScopes = await this.buildUserAuthScopes(user.id) || [];
            console.log('Adding configured user auth scopes:');
            console.log(configuredAuthScopes);
            authScopes = authScopes.concat(configuredAuthScopes);
            
            const configuredAppScopes = await this.buildUserAppScopes(user.id) || {};
            console.log('Adding configured user app scopes:');
            console.log(configuredAppScopes);
            appScopes = { ...appScopes,  ...configuredAppScopes };

            console.log('All assigned auth scopes:');
            console.log(authScopes);
            console.log('All assigned app scopes:');
            console.log(appScopes);
        }

        return { authScopes, appScopes };
    }

    /**
     * Builds a list of OAuth app scopes that are passed to the frontend application using the authorization token.
     * @param userId
     */
    private async buildUserAuthScopes(userId: string, roles?: string[]): Promise<Scope[]> {
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
    private async buildUserAppScopes(userId: string, roles?: string[]): Promise<any> {
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
                                scopeCodes[cur.scope.scopeCode as string] = (permissions instanceof Array && permissions.length > 0) ? permissions : null;
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
     * Builds a list of OAuth app scopes that are passed to the frontend application using the authorization token.
     * @param userId
     */
    private async buildAuthScopes(userId: string, roles?: string[]): Promise<Scope[]> {
        const roleService = Container.get(RoleService);

        const scopes = await roles.reduce(async (asyncUserScopeCodes: Promise<Scope[]>, roleCode: string) => {
            let results = await asyncUserScopeCodes;
            const role = await roleService.getByCode(roleCode);
            // RoleFrontendScopes and RoleApiScopes will be populated
            // Let's loop over the RoleApiScopes
            const roleScopeCodes: Scope[] = (role && role.roleApiScopes)
                ? role.roleApiScopes
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

            return asyncUserScopeCodes;
        }, Promise.resolve(['default'] as Scope[]));

        return scopes;
    }

    /**
     * Builds a list of user app scopes that are passed to the frontend application using the authorization token.
     * @param userId
     */
    private async buildAppScopes(userId: string, roles?: string[]): Promise<any> {
        const roleService = Container.get(RoleService);

        const scopes = await roles.reduce(async (asyncUserScopeCodes: Promise<{[key: string]: AppScopePermission[] | boolean }[]>, roleCode: string) => {
            let userRoleScopes = await asyncUserScopeCodes;
            const role = await roleService.getByCode(roleCode);
            const roleScopes: { [key: string]: string[] }[] = (role && role.roleFrontendScopes)
                ?  await role.roleFrontendScopes
                    .reduce(async (asyncScopeCodes: Promise<string[]>, cur: RoleFrontendScope) => {
                        let scopeCodes = await asyncScopeCodes;

                        if (cur.scope && cur.scope.scopeCode) {
                            const permissions = await this.buildRoleFrontendScopePermissions(cur, cur.scope)
                            scopeCodes[cur.scope.scopeCode as string] = (permissions instanceof Array && permissions.length > 0) ? permissions : null;
                        }
                        return scopeCodes;
                    }, Promise.resolve([]))
                : [];

            userRoleScopes = Object.assign({}, userRoleScopes, roleScopes);

            return userRoleScopes;
        }, Promise.resolve({}));

        return scopes;
    }

    private async buildSuperAdminAuthScopes(isDevSuperAdmin?: boolean) {
        const apiScopeService = Container.get(ApiScopeService);
        
        let excludedScopes: string[] = [];
        if (!isDevSuperAdmin) {
            // Filter out dev role scopes
            const roleService = Container.get(RoleService);
            const roleApiScopeService = Container.get(RoleApiScopeService);
            const role = await roleService.getByCode(SYSADMIN_ROLE_CODE)

            const roleApiScopes = await roleApiScopeService.getAll()
            excludedScopes = roleApiScopes
                .map((roleApiScope: RoleApiScope) => {
                    return (roleApiScope.roleId === role.id)
                        ? roleApiScope.scopeId
                        : undefined
                })
                .filter((roleApiScope) => roleApiScope) as string[];
        }
        
        const authScopes = await apiScopeService.getAll();
        return authScopes
            .filter((scope) => excludedScopes.indexOf(scope.id) === -1)
            .reduce((scopes, scope) => {
                scopes.push(scope.scopeCode as Scope);
                return scopes;
            }, ['default'] as Scope[]);
    }
    
    private async buildSuperAdminAppScopes(isDevSuperAdmin?: boolean) {
        const frontendScopeService = Container.get(FrontendScopeService);

        let excludedScopes: string[] = [];
        if (!isDevSuperAdmin) {
            // Filter out dev role scopes
            const roleService = Container.get(RoleService);
            const roleFrontendScopeService = Container.get(RoleFrontendScopeService) as RoleFrontendScopeService;
            const role = await roleService.getByCode(SYSADMIN_ROLE_CODE)

            const roleFrontendScopes = await roleFrontendScopeService.getAll() || [];
            excludedScopes = roleFrontendScopes
                .map((roleFrontendScope: RoleFrontendScope) => {
                    return (roleFrontendScope.roleId === role.id)
                        ? roleFrontendScope.scopeId
                        : undefined
                })
                .filter((roleFrontendScope) => roleFrontendScope) as string[];
        }
        
        const appScopes = await frontendScopeService.getAll();
        return appScopes
            .filter((scope) => excludedScopes.indexOf(scope.id) === -1)
            .reduce((scopes, scope) => {
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
        const isProductionMode = PRODUCTION_MODE;
        const useSiteMinder = USE_SITEMINDER;
        
        let user: User;

        const generatorService = Container.get(GeneratorService);
        // If we're developing locally, and TokenController.getToken DOES NOT HAVE siteminder specified as the auth handler 
        // we won't have a token / siteminder user to work with so use the built-in TESTUSR dummy account 
        if (!isProductionMode && !(tokenPayload && tokenPayload.userId)) {
            console.warn(`No siteminder token provided. In production this will throw an error. The message you're seeing is because you're in dev.`);
            user = await generatorService.getOrCreateDevUser();
        } else if (!isProductionMode && useSiteMinder) {
            console.log('USE_SITEMINDER is enabled, but we are not in PRODUCTION_MODE');
            // If we're developing locally, and TokenController.getToken HAS siteminder specified as the auth handler
            // the siteminder token will be provided by FakeMinder in which case the token payload will look like:
            // { displayName: "Test, Joe", guid: "SOMEGUIDGOESHERE", type: "user", userId: "TESTUSR" }
            if ((tokenPayload.guid === FAKEMINDER_GUID) || (tokenPayload.userId === FAKEMINDER_IDIR)) {
                console.log('The token payload is a FakeMinder token GUID or Auth ID (IDIR), get or create the built-in DEV user');
                user = await generatorService.getOrCreateDevUser();
            } else {
                console.log('The current user is not the built-in dev user (eg. perhaps we are running a test), get or create a siteminder authorized user');
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
        console.log(`TokenServiceException: Check to see if the siteminder user's account exists`);
        const userService = Container.get(UserService);
        let user = await userService.getByToken(tokenPayload);
        if (!user) {
            const locationService = Container.get(LocationService);
            const locationId = locationService.getByCode(DEFAULT_LOCATION);
            console.log(`TokenServiceException: Could not find the siteminder user's account - creating a new siteminder user account`);
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
