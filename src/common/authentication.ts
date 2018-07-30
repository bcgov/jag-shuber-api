
const SCOPE_ASSERTION_MESSAGE = "JWT did not have required scope for this action";
const SITEMINDER_AUTH_ERROR_MESSAGE = "Couldn't authenticate request.";
export const SITEMINDER_AUTH_ERROR = new Error(SITEMINDER_AUTH_ERROR_MESSAGE);
export const JWT_AUTH_ERROR = new Error(SCOPE_ASSERTION_MESSAGE);

export const SITEMINDER_HEADER_USERGUID = 'smgov_userguid';
export const SITEMINDER_HEADER_USERDISPLAYNAME = 'smgov_userdisplayname';
export const SITEMINDER_HEADER_USERTYPE = 'smgov_usertype';
export const SITEMINDER_HEADER_USERIDENTIFIER = 'smgov_useridentifier';

export const DEFAULT_SCOPES: Scope[] = ['default'];
export const TOKEN_COOKIE_NAME = "app_token";

export interface Scopes {
    default: 'default',
    none: 'none'
}

/** 
 * The different types of user scopes/claims within the system
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
 * Checks a TokenPayload for all given scopes
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
 * Asserts that all scopes are present in a given TokenPayload
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



