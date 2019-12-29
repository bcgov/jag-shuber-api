"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SCOPE_ASSERTION_MESSAGE = "JWT did not have required scope for this action";
var SITEMINDER_AUTH_ERROR_MESSAGE = "Couldn't authenticate request.";
exports.SITEMINDER_AUTH_ERROR = new Error(SITEMINDER_AUTH_ERROR_MESSAGE);
exports.JWT_AUTH_ERROR = new Error(SCOPE_ASSERTION_MESSAGE);
exports.SITEMINDER_HEADER_USERGUID = 'smgov_userguid';
exports.SITEMINDER_HEADER_USERDISPLAYNAME = 'smgov_userdisplayname';
exports.SITEMINDER_HEADER_USERTYPE = 'smgov_usertype';
exports.SITEMINDER_HEADER_USERIDENTIFIER = 'smgov_useridentifier';
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