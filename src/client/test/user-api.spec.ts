import ApiClient from '../ExtendedClient';
import {
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';
import {
    TOKEN_COOKIE_NAME,
    TokenPayload,
    DEFAULT_SCOPES,
    SITEMINDER_AUTH_ERROR
} from '../../common/authentication';
import { decodeJwt } from '../../common/tokenUtils'

describe('User API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        done();
    });

    it('Should return the current user info', async () => {
        api = TestUtils.getClientWithAuth();
        const user = await api.GetCurrentUser();
        expect(user).toBeDefined();
        expect(user).toMatchObject(TestUtils.DefaultAuthConfig)
    });

    it('Should correctly handle multipe users', async () => {
        const numUsers = 50;
        expect.assertions(numUsers*2);
        const users = [...Array(numUsers).keys()].map(k=>`user${k}`);
        await Promise.all(users.map(async guid => {
            const userApi = TestUtils.getClientWithAuth({ guid });
            const user = await userApi.GetCurrentUser();
            expect(user).toBeDefined();
            expect(user).toMatchObject({ ...TestUtils.DefaultAuthConfig, guid });
        }));
    });


}) 