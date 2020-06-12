import { TokenPayload } from '../../common/authentication';
import { TokenService } from '../../services/TokenService';
import { User } from '../../models/User';

require('dotenv').config()

describe('token service', () => {
    const testPayload: TokenPayload = {
        displayName: 'Nye, Bill',
        guid: 'someid',
        type: 'user',
        userId: 'bnye',
        scopes: ['default']
    }

    const OLD_ENV = process.env;
    const TokenServiceInstance = new TokenService();
    const devSuperAdminUser = {
        userAuthId: 'LUCASLOP'
    } as User;
    const prodSuperAdminUser = {
        userAuthId: 'LUCASLOP'
    } as User;

    test("isMasterSuperAdmin should return true if the user's IDIR is listed in DEV_SA_AUTH_ID", async () => {
        console.log(process.env);
        expect(TokenService.isMasterSuperAdmin(devSuperAdminUser)).toEqual(true);
    });

    test("isMasterSuperAdmin should return false if the user's IDIR is not listed in DEV_SA_AUTH_ID", async () => {
        console.log(process.env);
        expect(TokenService.isMasterSuperAdmin(devSuperAdminUser)).toEqual(false);
    });

    test("isProdSuperAdmin should return true if the user's IDIR is listed in SA_AUTH_ID", async () => {
        expect(TokenService.isProdSuperAdmin(prodSuperAdminUser)).toEqual(true);
    });

    test("isProdSuperAdmin should return false if the user's IDIR is not listed in SA_AUTH_ID", async () => {
        expect(TokenService.isProdSuperAdmin(prodSuperAdminUser)).toEqual(false);
    });
});