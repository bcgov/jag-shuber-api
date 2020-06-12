import { CookieAccessInfo } from 'cookiejar';
import { SuperAgent } from 'superagent';

/**
 * Retreives a cookie from either the cookie jar of a SuperAgent or from the
 * Document itself.
 *
 * @private
 * @returns
 * @memberof Client
 */
export function retreiveCookieValue(cookieName: string, agent?: SuperAgent<any>) {
    let token: string | undefined = undefined;
    if (agent && agent.jar) {
        const nodeCookieAccessInfo: CookieAccessInfo = {
            path: '/',
            script: true
        } as any;
        const cookie = agent.jar.getCookie(cookieName, nodeCookieAccessInfo);
        if (cookie) {
            token = cookie.value;
        }
    } else {
        const cookieString = document.cookie.split(';').find(cs => cs.startsWith(cookieName));
        if (cookieString) {
            token = cookieString.replace(`${cookieName}=`, '');
        }
    }
    
    return token;
}