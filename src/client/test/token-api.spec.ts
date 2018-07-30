import ApiClient from '../ExtendedClient';
import { auth } from '../index';
import {
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';
import { TOKEN_COOKIE_NAME, TokenPayload, DEFAULT_SCOPES } from '../../common/authentication';
import { decodeJwt } from '../../common/token'

const SubCodeShape: LeaveSubCode = {
    code: 'some string',
    subCode: 'some string',
    description: 'some string'
}

describe('Token API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        done();
    });

    it('get token should with no siteminder headers should return not authorized', async () => {
        api = TestUtils.getClient();
        await expect(api.GetToken()).rejects.toEqual(new Error("Couldn't authenticate request."));
    });

    it('get token with siteminder headers should use token in subsequent requests', async () => {
        const testGuid = 'btester';
        api = TestUtils.getClientWithAuth(testGuid);

        await expect(api.GetToken()).resolves.toBeDefined();

        // confirm that the cookies are set and sent with outgoing requests
        // after acquiring a token
        api.requestInterceptor = (req) => {
            expect(req.cookies).toBeDefined();
            const cookieParts = req.cookies.split(';');
            const tokenName = `${TOKEN_COOKIE_NAME}=`;
            const token = cookieParts.find(p => p.startsWith(tokenName)).replace(tokenName, '');
            const payload = decodeJwt<TokenPayload>(token);
            expect(payload.guid).toEqual(testGuid);
            expect(payload.scopes).toEqual(expect.arrayContaining(DEFAULT_SCOPES));
            return req;
        }
        await api.GetCourthouses();
    });

}) 