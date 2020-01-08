import { AppScopePermission } from '../models/AppScope';
export declare const SITEMINDER_AUTH_ERROR: Error;
export declare const JWT_AUTH_ERROR: Error;
export declare const SITEMINDER_HEADER_USERGUID = "smgov_userguid";
export declare const SITEMINDER_HEADER_USERDISPLAYNAME = "smgov_userdisplayname";
export declare const SITEMINDER_HEADER_USERTYPE = "smgov_usertype";
export declare const SITEMINDER_HEADER_USERIDENTIFIER = "smgov_useridentifier";
export declare const DEFAULT_SCOPES: Scope[];
export declare const TOKEN_COOKIE_NAME = "app_token";
/**
 * Define all the available OAuth scopes.
 */
export interface Scopes {
    default: 'default';
    none: 'none';
    admin_users: 'admin:users';
    admin_user_roles: 'admin:user:roles';
    admin_sheriff_leaves: 'admin:sheriff:leaves';
    admin_sheriff_locations: 'admin:sheriff:locations';
    admin_sheriff_training: 'admin:sheriff:training';
    sheriffs_add: 'sheriffs:add';
    sheriffs_deactivate: 'sheriffs:deactivate';
    sheriffs_delete: 'sheriffs:delete';
    sheriffs_edit: 'sheriffs:edit';
    sheriffs_view: 'sheriffs:view';
    system_locations: 'system:locations';
    system_scopes_api: 'system:scopes:api';
    system_scopes_ui: 'system:scopes:ui';
    system_types_assignment: 'system:types:assignment';
    system_types_leaves: 'system:types:leaves';
    system_types_training: 'system:types:training';
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
