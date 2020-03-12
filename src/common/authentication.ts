import { AppScopePermission } from '../models/AppScope';

const SCOPE_ASSERTION_MESSAGE = "JWT did not have required scope for this action";
const SITEMINDER_AUTH_ERROR_MESSAGE = "Couldn't authenticate request.";
export const SITEMINDER_AUTH_ERROR = new Error(SITEMINDER_AUTH_ERROR_MESSAGE);
export const JWT_AUTH_ERROR = new Error(SCOPE_ASSERTION_MESSAGE);

/**
 * FakeMinder stuff, just for local development
 */
export const FAKEMINDER_IDIR = "TESTUSR";
export const FAKEMINDER_GUID = "SOMEGUIDGOESHERE";

/**
 * These env vars are used to configure which user is granted full access rights to the system in a production environment.
 * It is / will be used to seed access privileges for the built-in super admin user, and to associate it with a specific
 * CA Siteminder user ID and corresponding IDIR, which is configured using OpenShift.
 */
export const SA_SITEMINDER_ID = process.env.SYS_SA_SITEMINDER_ID || null; // Super-Admin User's Siteminder User ID (Prod)
export const SA_AUTH_ID = process.env.SYS_SA_AUTH_ID || null; // Super-Admin's IDIR (Prod)
/**
 * These are the same as the SA_SITEMINDER_ID and SA_AUTH_ID env vars, except they control which user is granted
 * full access rights to the system in a development environment.
 */
export const DEV_SA_SITEMINDER_ID = process.env.SYS_DEV_SA_SITEMINDER_ID || null; // Super-Admin User's Siteminder User ID (Dev)
export const DEV_SA_AUTH_ID = process.env.SYS_DEV_SA_AUTH_ID || null; // Super-Admin's IDIR (Dev)
/**
 * This is used to configure a fake IDIR account name for local development purposes.
 */
export const DEV_USER_DISPLAY_NAME = 'Test User'; // Test User Display Name
export const DEV_USER_AUTH_ID = 'TESTUSR'; // Test User Auth ID (substitute for IDIR)
// The Role to Assign to Test User, only valid if using the configured DEV_USER_AUTH_ID user account.
// Use this to test different roles that may have been entered into the database.
// The field below refers to the DEV_USER_TEST_ROLES role code or the desired role.
export const DEV_USER_TEST_ROLES = ['TESTASSIGN', 'TESTLEAVES', 'TESTAUTH'];
// export const DEV_USER_TEST_ROLES = ['TESTASSIGN', 'TESTLEAVES', 'TESTAUTH']; // TODO: Build these in! TESTASSIGN | TESTAUTH | TESTLEAVES
/**
 * System user display name. Just a value to use when the application updates a database record, and the action is not
 * attributable to a user, for whatever reason.
 */
export const SYSTEM_USER_DISPLAY_NAME = 'System User';

/**
 * Configure siteminder headers.
 */
export const SITEMINDER_HEADER_USERGUID = 'smgov_userguid';
export const SITEMINDER_HEADER_USERDISPLAYNAME = 'smgov_userdisplayname';
export const SITEMINDER_HEADER_USERTYPE = 'smgov_usertype';
export const SITEMINDER_HEADER_USERIDENTIFIER = process.env.SYS_AUTH_ID_SM_HEADER_KEY || 'smgov_useridentifier';

export const DEFAULT_SCOPES: Scope[] = ['default'];
export const TOKEN_COOKIE_NAME = "app_token";

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
    default: 'default',
    none: 'none',
    users_manage: 'users:manage',
    roles_manage: 'roles:manage',
    sheriffs_manage: 'sheriffs:manage',
    sheriffs_update: 'sheriffs:update',
    system_scopes: 'system:scopes',
    system_scopes_read: 'system:scopes:read',
    system_types: 'system:types',
    system_types_read: 'system:types:read'
}

/**
 * The different types of user scopes/claims within the system.
 */
export type Scope = Scopes[keyof (Scopes)];

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
    appScopes?: { [key: string]: string[] | boolean }[];
}

/**
 * Checks a TokenPayload for the given scope
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 * @returns {boolean}
 */
export function hasScope(payload: TokenPayload, scope: Scope): boolean {
    const { scopes = [] } = payload || {};
    return scopes.indexOf(scope) >= 0;
}

/**
 * Asserts that a particular scope is present in a give TokenPayload
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 */
export function assertScope(payload: TokenPayload, scope: Scope) {
    if (!hasScope(payload, scope)) {
        throw new Error(SCOPE_ASSERTION_MESSAGE);
    }
}

/**
 * Checks a TokenPayload for all given scopes.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {...Scope[]} scopes
 * @returns {boolean}
 */
export function hasAllScopes(payload: TokenPayload, scopes: Scope[] = []): boolean {
    return !scopes.some(s => !hasScope(payload, s));
}

/**
 * Asserts that all scopes are present in a given TokenPayload.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope[]} [scopes=[]]
 */
export function assertAllScopes(payload: TokenPayload, scopes: Scope[] = []) {
    if (!hasAllScopes(payload, scopes)) {
        throw new Error(SCOPE_ASSERTION_MESSAGE);
    }
}
