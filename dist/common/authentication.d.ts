export declare const SITEMINDER_AUTH_ERROR: Error;
export declare const JWT_AUTH_ERROR: Error;
/**
 * FakeMinder stuff, just for local development
 */
export declare const FAKEMINDER_IDIR = "";
export declare const FAKEMINDER_GUID = "SOMEGUIDGOESHERE";
/**
 * These env vars are used to configure which user is granted full access rights to the system in a production environment.
 * It is / will be used to seed access privileges for the built-in super admin user, and to associate it with a specific
 * CA Siteminder user ID and corresponding IDIR, which is configured using OpenShift.
 */
export declare const SA_SITEMINDER_ID: string;
export declare const SA_AUTH_ID: string;
/**
 * These are the same as the SA_SITEMINDER_ID and SA_AUTH_ID env vars, except they control which user is granted
 * full access rights to the system in a development environment.
 */
export declare const DEV_SA_SITEMINDER_ID: string;
export declare const DEV_SA_AUTH_ID: string;
/**
 * This is used to configure a fake IDIR account name for local development purposes.
 */
export declare const DEV_USER_DISPLAY_NAME = "Test User";
export declare const DEV_USER_AUTH_ID = "TESTUSR";
export declare const DEV_USER_TEST_ROLES: string[];
export declare const USER_DEFAULT_ROLES: any[];
/**
 * System user display name. Just a value to use when the application updates a database record, and the action is not
 * attributable to a user, for whatever reason.
 */
export declare const SYSTEM_USER_DISPLAY_NAME = "System User";
/**
 * Configure siteminder headers.
 */
export declare const SITEMINDER_HEADER_USERDISPLAYNAME = "smgov_userdisplayname";
export declare const SITEMINDER_HEADER_USERTYPE = "smgov_usertype";
export declare const SITEMINDER_HEADER_USERGUID = "smgov_userguid";
export declare const SITEMINDER_HEADER_USERIDENTIFIER: string;
export declare const SITEMINDER_HEADER_USER = "sm_user";
export declare const SITEMINDER_HEADER_UNIVERSALID = "sm_universalid";
export declare const SITEMINDER_HEADER_COOKIE = "cookie";
export declare const DEFAULT_SCOPES: Scope[];
export declare const TOKEN_COOKIE_NAME = "app_token";
export declare const SMSESSION_COOKIE_NAME = "SMSESSION";
/**
 * Define OAuth scopes that are applied to application routes using tsoa's @Security decorator.
 * eg. @Security('jwt', ['system:scopes']) Note! These scopes configure how tsoa will generate routes.ts.
 *
 * This is distinct from the related but separate read-only System Scopes entries that are automatically populated
 * into the application's database. In order to assign a scope defined here to a user, a corresponding system scope
 * record must exist in the database. However, those are defined separately. See systemScopes.ts, located in the
 * same folder as this file to change the configuration.
 */
export interface Scopes {
    default: 'default';
    none: 'none';
    users_manage: 'users:manage';
    roles_manage: 'roles:manage';
    sheriffs_manage: 'sheriffs:manage';
    sheriffs_update: 'sheriffs:update';
    system_scopes: 'system:scopes';
    system_scopes_read: 'system:scopes:read';
    system_types: 'system:types';
    system_types_read: 'system:types:read';
}
/**
 * The different types of user scopes/claims within the system.
 */
export declare type Scope = Scopes[keyof (Scopes)];
/**
 * The payload of a compact JWT token within the Sheriff Scheduling application.
 *
 * @export
 * @interface TokenPayload
 */
export interface TokenPayload {
    guid?: string;
    displayName?: string;
    userId?: string;
    type?: string;
    scopes?: Scope[];
    appScopes?: {
        [key: string]: string[] | boolean;
    }[];
}
/**
 * Checks a TokenPayload for the given scope
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 * @returns {boolean}
 */
export declare function hasScope(payload: TokenPayload, scope: Scope): boolean;
/**
 * Asserts that a particular scope is present in a give TokenPayload
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 */
export declare function assertScope(payload: TokenPayload, scope: Scope): void;
/**
 * Checks a TokenPayload for all given scopes.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {...Scope[]} scopes
 * @returns {boolean}
 */
export declare function hasAllScopes(payload: TokenPayload, scopes?: Scope[]): boolean;
/**
 * Asserts that all scopes are present in a given TokenPayload.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope[]} [scopes=[]]
 */
export declare function assertAllScopes(payload: TokenPayload, scopes?: Scope[]): void;
