import { Request } from 'koa';
import moment from 'moment';
import { Security as TSOASecurity } from 'tsoa';
import {
    Scope,
    assertAllScopes,
    SITEMINDER_AUTH_ERROR,
    SITEMINDER_HEADER_USERGUID,
    SITEMINDER_HEADER_USERDISPLAYNAME,
    SITEMINDER_HEADER_USERIDENTIFIER,
    SITEMINDER_HEADER_USERTYPE,
    SITEMINDER_HEADER_USER,
    SITEMINDER_HEADER_UNIVERSALID,
    SITEMINDER_HEADER_COOKIE,
    TokenPayload,
    DEFAULT_SCOPES,
    TOKEN_COOKIE_NAME
} from './common/authentication';

import { verifyToken } from './infrastructure/token';
import { decodeJwt } from './common/tokenUtils';

/**
 * The type of security that should be applied to the endpoint.
 * siteminder -> extracts user information from siteminder headers
 * jwt -> extracts user information / scopes from JSON Web Token
 */
export type SecurityType = "siteminder" | "jwt";

/**
 * Wrapper around TSOA Security decorator to give us type safety
 *
 * @export
 * @param {SecurityType} securityType
 * @param {Scope[]} [scopes=DEFAULT_SCOPES]
 * @returns
 */
export function Security(securityType: SecurityType, scopes: Scope[] = DEFAULT_SCOPES) {
    return TSOASecurity(securityType, scopes);
}

/**
 * Sets the Token Cookie
 *
 * @export
 * @param {Request} request
 * @param {string} token
 */
export function setTokenCookie(request: Request, token: string) {
    request.ctx.cookies.set(TOKEN_COOKIE_NAME, token, {
        // signed: true,
        // secure: true,
        overwrite: true,
        httpOnly: false,
        maxAge: 30 * 60 * 1000
    });
}

/**
 * Gets the Token string from the Cookie
 *
 * @export
 * @param {Request} request
 * @returns {string}
 */
export function getTokenCookie(request: Request): string {
    return request.ctx.cookies.get(TOKEN_COOKIE_NAME)
}

export function extendTokenCookieExpiry(request: Request, token: string) {
    request.ctx.cookies.set(TOKEN_COOKIE_NAME, getTokenCookie(request), {
        overwrite: true,
        httpOnly: false,
        expires: moment().subtract(1, 'hour').toDate()
    })
}

export function deleteTokenCookie(request: Request) {
    request.ctx.cookies.set(TOKEN_COOKIE_NAME, getTokenCookie(request), {
        overwrite: true,
        httpOnly: false,
        expires: moment().subtract(1, 'hour').toDate()
    })
}

/**
 * Parses a TokenPayload from siteminder headers if they are present
 * @param {Request} request
 * @returns {TokenPayload}
 */
function getTokenPayloadFromHeaders(request: Request): TokenPayload {
    const { headers = {} } = request;
    
    const payload = {
        guid: headers[SITEMINDER_HEADER_USERGUID],
        displayName: headers[SITEMINDER_HEADER_USERDISPLAYNAME],
        userId: headers[SITEMINDER_HEADER_USERIDENTIFIER],
        type: headers[SITEMINDER_HEADER_USERTYPE],
        [SITEMINDER_HEADER_COOKIE]: headers[SITEMINDER_HEADER_COOKIE]
    }
    
    const debugOutput = {
        [SITEMINDER_HEADER_USERDISPLAYNAME]: headers[SITEMINDER_HEADER_USERDISPLAYNAME],
        [SITEMINDER_HEADER_USERTYPE]: headers[SITEMINDER_HEADER_USERTYPE],
        [SITEMINDER_HEADER_USERGUID]: headers[SITEMINDER_HEADER_USERGUID],
        [SITEMINDER_HEADER_USERIDENTIFIER]: headers[SITEMINDER_HEADER_USERIDENTIFIER],
        [SITEMINDER_HEADER_USER]: headers[SITEMINDER_HEADER_USER],
        [SITEMINDER_HEADER_UNIVERSALID]: headers[SITEMINDER_HEADER_UNIVERSALID]
        // [SITEMINDER_HEADER_COOKIE]: headers[SITEMINDER_HEADER_COOKIE] // TODO: Just log whether or not there's a cookie
    }

    console.log('CA SITEMINDER Headers');
    console.log(debugOutput);
    // console.log(headers);

    return payload;
}

/**
 * The authentication middleware used by TSOA
 * see https://github.com/lukeautry/tsoa#authentication
 *
 * @export
 * @param {Request} request
 * @param {string} securityName
 * @param {string[]} [securityScopes=DEFAULT_SCOPES]
 * @returns {Promise<any>}
 */
export async function koaAuthentication(request: Request, securityName: string, securityScopes: string[] = DEFAULT_SCOPES): Promise<any> {
    const securityType: SecurityType = securityName as any;
    const scopes: Scope[] = securityScopes as any;
    if (securityType === 'siteminder') {
        console.log('-------------------------------------');
        console.log('Using SiteMinder authentication');
        console.log('Getting token payload from headers...')
        const siteminderHeaders = getTokenPayloadFromHeaders(request);
        
        if (siteminderHeaders && siteminderHeaders.guid) {
            return siteminderHeaders;
        } else {
            throw SITEMINDER_AUTH_ERROR
        }
    }

    if (securityType === 'jwt') {
        console.log('-------------------------------------');
        const token = request.ctx.cookies.get(TOKEN_COOKIE_NAME);
        console.log('Using JWT authentication');
        console.log(request.ctx.cookies.get(TOKEN_COOKIE_NAME));

        const payload = await verifyToken(token);
        console.log('JWT token has been verified - continue');

        console.log('Asserting user has required scopes...')
        assertAllScopes(payload, scopes);

        return payload;
    }

    throw new Error('Unknown Security Type');
}
