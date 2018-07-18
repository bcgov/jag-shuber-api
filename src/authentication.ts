import { Request } from 'koa';
import { Security as TSOASecurity } from 'tsoa';
import { Scope, hasScope, assertAllScopes, JWT_AUTH_ERROR, SITEMINDER_AUTH_ERROR, SITEMINDER_HEADER_USERGUID, SITEMINDER_HEADER_USERDISPLAYNAME, SITEMINDER_HEADER_USERIDENTIFIER, SITEMINDER_HEADER_USERTYPE, TokenPayload } from './common/authentication';
import { verifyToken } from './infrastructure/token';

const DEFAULT_SCOPES: Scope[] = ['default'];
const TOKEN_COOKIE_NAME = "app_token";

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

function getTokenPayloadFromHeaders(request: Request): TokenPayload {
    const { headers = {} } = request;
    return {
        guid: headers[SITEMINDER_HEADER_USERGUID],
        displayName: headers[SITEMINDER_HEADER_USERDISPLAYNAME],
        userId: headers[SITEMINDER_HEADER_USERIDENTIFIER],
        type: headers[SITEMINDER_HEADER_USERTYPE]
    }
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
        maxAge: 5000
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
        const siteminderHeaders = getTokenPayloadFromHeaders(request);
        if (siteminderHeaders && siteminderHeaders.guid) {
            return siteminderHeaders;
        } else {
            throw SITEMINDER_AUTH_ERROR
        }
    }

    if (securityType === 'jwt') {
        // const token = request.body.token || request.query.token || request.headers['x-access-token'];
        const token = request.ctx.cookies.get(TOKEN_COOKIE_NAME);
        const payload = await verifyToken(token);
        assertAllScopes(payload, scopes);
        return payload;
    }

    throw new Error('Unknown Security Type');
}
