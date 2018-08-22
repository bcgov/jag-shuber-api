import ApiClient from '../ExtendedClient';
import {
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';
import { TOKEN_COOKIE_NAME, TokenPayload, DEFAULT_SCOPES, SITEMINDER_AUTH_ERROR } from '../../common/authentication';
import { decodeJwt } from '../../common/tokenUtils'

describe('Token API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        done();
    });

    it('get token should with no siteminder headers should return not authorized', async () => {
        api = TestUtils.getClient();
        await expect(api.GetToken()).rejects.toMatchObject({
            message: "Unauthorized",
            status: 401,
            response: {
                body: {
                    message: SITEMINDER_AUTH_ERROR.message
                }
            }
        });
    });

    it('api should fire onTokenChanged event when a token is acquired', async () => {
        expect.assertions(3);
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth({guid:testGuid});
        let eventTokenString: string | undefined;
        api.onTokenChanged.on(t => {
            expect(t).toBeDefined();
            eventTokenString = t;
        });
        const tokenString = await api.GetToken();
        expect(tokenString).toBeDefined();
        expect(tokenString).toEqual(eventTokenString);
    });

    it('api should fire onTokenChanged event when a token cannot be acquired', async () => {
        expect.assertions(3);
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth({guid:testGuid});
        const tokenString = await api.GetToken();
        expect(tokenString).toBeDefined();
        // turn requestInterceptor into a no-op to clear headers (i.e. auth)
        api.requestInterceptor = (req) => req;
        api.onTokenChanged.on(t => {
            expect(t).toBeUndefined();
        });

        // expect the api to throw an exception here
        await expect(api.GetToken()).rejects.toBeDefined();
    });


    it('get token should return Token string that can be decoded', async () => {
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth({guid:testGuid});
        let tokenString: string;
        tokenString = await api.GetToken();
        expect(tokenString).toBeDefined();
        expect(typeof (tokenString)).toEqual(typeof ('string'));

        const token = decodeJwt<TokenPayload>(tokenString);
        expect(token).toBeDefined();
        if (token) {
            expect(token).toBeDefined();
            expect(token.scopes).toBeDefined();
            expect(Array.isArray(token.scopes)).toBeTruthy();
            expect(token.guid).toBeDefined();
        }
    });

    it('get token with siteminder headers should use token in subsequent requests', async () => {
        expect.assertions(4);
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth({guid:testGuid});

        await expect(api.GetToken()).resolves.toBeDefined();

        // confirm that the cookies are set and sent with outgoing requests
        // after acquiring a token
        api.requestInterceptor = (req) => {
            expect(req.cookies).toBeDefined();
            const cookieParts = req.cookies.split(';');
            const tokenName = `${TOKEN_COOKIE_NAME}=`;
            const token = (cookieParts.find(p => p.startsWith(tokenName)) || '').replace(tokenName, '');
            const payload = decodeJwt<TokenPayload>(token) as TokenPayload;
            expect(payload.guid).toEqual(testGuid);
            expect(payload.scopes).toEqual(expect.arrayContaining(DEFAULT_SCOPES));
            return req;
        }
        await api.GetCourthouses();
    });


    it('logout should remove token cookie from subsequent requests', async () => {
        expect.assertions(6);
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth({guid:testGuid});

        const firstToken = await api.GetToken();
        expect(firstToken).toBeDefined();
        api.onTokenChanged.once(t => {
            expect(t).toBeUndefined();
        });
        await api.Logout();
        const otherApiUser = TestUtils.getClientWithAuth({guid:'otherUser'});

        // confirm that the cookies have been removed from outgoing requests
        // then use another apiUser to do request
        api.requestInterceptor = (req) => {
            expect(req.cookies.indexOf(TOKEN_COOKIE_NAME)).toEqual(-1);
            expect(otherApiUser.requestInterceptor).toBeDefined();
            if (otherApiUser.requestInterceptor) {
                return otherApiUser.requestInterceptor(req);
            }
            return req;
        }
        const secondToken = await api.GetToken();
        expect(secondToken).toBeDefined();
        expect(secondToken).not.toEqual(firstToken);
    });

}) 