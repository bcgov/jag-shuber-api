import { createToken, verifyToken } from '../token'
import { TokenPayload } from '../../common/authentication';

describe('token utils', () => {
    const testPayload: TokenPayload = {
        displayName: 'Nye, Bill',
        guid: 'someid',
        type: 'user',
        userId: 'bnye',
        scopes: ['default']
    }

    const secret = 'secret';

    it('should create a token', async () => {
        const token = await createToken(testPayload, secret);
        expect(token).toBeDefined();
        expect(typeof (token)).toEqual(typeof ('string'));
    });

    it('verify a token given the same secret', async () => {
        const token = await createToken(testPayload, secret);
        const verifiedToken = await verifyToken(token, secret);
        expect(verifiedToken).toBeDefined();
        expect(verifiedToken).toMatchObject(testPayload);
    });

    it('verify an expired token should throw error', async () => {
        const token = await createToken(testPayload, secret, { expiresIn: '10 second' });
        await expect(verifyToken(token, secret)).resolves.toMatchObject(testPayload);
        const expiredToken = await createToken(testPayload, secret, { expiresIn: '-1 second' });
        await expect(verifyToken(expiredToken, secret)).rejects.toBeDefined()
    });
});

