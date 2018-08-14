"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Retreives a cookie from either the cookie jar of a SuperAgent or from the
 * Document itself.
 *
 * @private
 * @returns
 * @memberof Client
 */
function retreiveCookieValue(cookieName, agent) {
    var token = undefined;
    if (agent && agent.jar) {
        var nodeCookieAccessInfo = {
            path: '/',
            script: true
        };
        var cookie = agent.jar.getCookie(cookieName, nodeCookieAccessInfo);
        if (cookie) {
            token = cookie.value;
        }
    }
    else {
        var cookieString = document.cookie.split(';').find(function (cs) { return cs.startsWith(cookieName); });
        if (cookieString) {
            token = cookieString.replace(cookieName + "=", '');
        }
    }
    return token;
}
exports.retreiveCookieValue = retreiveCookieValue;
//# sourceMappingURL=../../src/dist/common/cookieUtils.js.map