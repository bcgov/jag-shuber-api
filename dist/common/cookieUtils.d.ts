import { SuperAgent } from 'superagent';
/**
 * Retreives a cookie from either the cookie jar of a SuperAgent or from the
 * Document itself.
 *
 * @private
 * @returns
 * @memberof Client
 */
export declare function retreiveCookieValue(cookieName: string, agent?: SuperAgent<any>): string | undefined;
