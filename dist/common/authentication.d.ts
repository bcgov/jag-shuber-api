export declare const SITEMINDER_AUTH_ERROR: Error;
export declare const JWT_AUTH_ERROR: Error;
export declare const SITEMINDER_HEADER_USERGUID = "smgov_userguid";
export declare const SITEMINDER_HEADER_USERDISPLAYNAME = "smgov_userdisplayname";
export declare const SITEMINDER_HEADER_USERTYPE = "smgov_usertype";
export declare const SITEMINDER_HEADER_USERIDENTIFIER = "smgov_useridentifier";
export declare const DEFAULT_SCOPES: Scope[];
export declare const TOKEN_COOKIE_NAME = "app_token";
export interface Scopes {
    default: 'default';
    none: 'none';
}
/**
 * The different types of user scopes/claims within the system
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
 * Checks a TokenPayload for all given scopes
 *
 * @export
 * @param {TokenPayload} payload
 * @param {...Scope[]} scopes
 * @returns {boolean}
 */
export declare function hasAllScopes(payload: TokenPayload, scopes?: Scope[]): boolean;
/**
 * Asserts that all scopes are present in a given TokenPayload
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope[]} [scopes=[]]
 */
export declare function assertAllScopes(payload: TokenPayload, scopes?: Scope[]): void;
