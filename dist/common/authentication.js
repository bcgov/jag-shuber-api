"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCOPE_ASSERTION_MESSAGE = "JWT did not have required scope for this action";
var SITEMINDER_AUTH_ERROR_MESSAGE = "Couldn't authenticate request.";
exports.SITEMINDER_AUTH_ERROR = new Error(SITEMINDER_AUTH_ERROR_MESSAGE);
exports.JWT_AUTH_ERROR = new Error(SCOPE_ASSERTION_MESSAGE);
/**
 * FakeMinder stuff, just for local development
 */
exports.FAKEMINDER_IDIR = "TESTUSR";
exports.FAKEMINDER_GUID = "SOMEGUIDGOESHERE";
/**
 * These env vars are used to configure which user is granted full access rights to the system in a production environment.
 * It is / will be used to seed access privileges for the built-in super admin user, and to associate it with a specific
 * CA Siteminder user ID and corresponding IDIR, which is configured using OpenShift.
 */
exports.SA_SITEMINDER_ID = process.env.SYS_SA_SITEMINDER_ID || null; // Super-Admin User's Siteminder User ID (Prod)
exports.SA_AUTH_ID = process.env.SYS_SA_AUTH_ID || null; // Super-Admin's IDIR (Prod)
/**
 * These are the same as the SA_SITEMINDER_ID and SA_AUTH_ID env vars, except they control which user is granted
 * full access rights to the system in a development environment.
 */
exports.DEV_SA_SITEMINDER_ID = process.env.SYS_DEV_SA_SITEMINDER_ID || null; // Super-Admin User's Siteminder User ID (Dev)
exports.DEV_SA_AUTH_ID = process.env.SYS_DEV_SA_AUTH_ID || null; // Super-Admin's IDIR (Dev)
/**
 * This is used to configure a fake IDIR account name for local development purposes.
 */
exports.DEV_USER_DISPLAY_NAME = 'Test User'; // Test User Display Name
exports.DEV_USER_AUTH_ID = 'TESTUSR'; // Test User Auth ID (substitute for IDIR)
/**
 * System user display name. Just a value to use when the application updates a database record, and the action is not
 * attributable to a user, for whatever reason.
 */
exports.SYSTEM_USER_DISPLAY_NAME = 'System User';
/**
 * Configure siteminder headers.
 */
exports.SITEMINDER_HEADER_USERGUID = 'smgov_userguid';
exports.SITEMINDER_HEADER_USERDISPLAYNAME = 'smgov_userdisplayname';
exports.SITEMINDER_HEADER_USERTYPE = 'smgov_usertype';
exports.SITEMINDER_HEADER_USERIDENTIFIER = process.env.SYS_AUTH_ID_SM_HEADER_KEY || 'smgov_useridentifier';
exports.DEFAULT_SCOPES = ['default'];
exports.TOKEN_COOKIE_NAME = "app_token";
/**
 * Checks a TokenPayload for the given scope
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 * @returns {boolean}
 */
function hasScope(payload, scope) {
    var _a = (payload || {}).scopes, scopes = _a === void 0 ? [] : _a;
    return scopes.indexOf(scope) >= 0;
}
exports.hasScope = hasScope;
/**
 * Asserts that a particular scope is present in a give TokenPayload
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope} scope
 */
function assertScope(payload, scope) {
    if (!hasScope(payload, scope)) {
        throw new Error(SCOPE_ASSERTION_MESSAGE);
    }
}
exports.assertScope = assertScope;
/**
 * Checks a TokenPayload for all given scopes.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {...Scope[]} scopes
 * @returns {boolean}
 */
function hasAllScopes(payload, scopes) {
    if (scopes === void 0) { scopes = []; }
    return !scopes.some(function (s) { return !hasScope(payload, s); });
}
exports.hasAllScopes = hasAllScopes;
/**
 * Asserts that all scopes are present in a given TokenPayload.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {Scope[]} [scopes=[]]
 */
function assertAllScopes(payload, scopes) {
    if (scopes === void 0) { scopes = []; }
    if (!hasAllScopes(payload, scopes)) {
        throw new Error(SCOPE_ASSERTION_MESSAGE);
    }
}
exports.assertAllScopes = assertAllScopes;
//# sourceMappingURL=../../src/dist/common/authentication.js.map