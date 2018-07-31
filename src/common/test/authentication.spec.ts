import { hasScope, hasAllScopes, assertScope, assertAllScopes, TokenPayload, Scope } from '../authentication';

describe('token utils', () => {
    const testPayload: TokenPayload = {
        displayName: 'Nye, Bill',
        guid: 'someid',
        type: 'user',
        userId: 'bnye',
        scopes: ['default']
    }

    it('hasScope should return true on scope present', async () => {
        expect(hasScope(testPayload, 'default')).toEqual(true);
    });

    it('hasScope should return false on scope present', async () => {
        expect(hasScope(testPayload, 'none')).toEqual(false);
    });

    it('assertScope should do nothing on scope present', async () => {
        expect(() => assertScope(testPayload, 'default')).not.toThrow();
    });

    it('assertScope should do nothing on scope present', async () => {
        expect(() => assertScope(testPayload, 'none')).toThrow();
    });

    it('hasAllScopes should return true on all scopes present', async () => {
        expect(hasAllScopes(testPayload, ['default'])).toEqual(true);

        const allScopes: Scope[] = ['default', 'none']
        expect(hasAllScopes({
            ...testPayload,
            scopes: allScopes
        }, allScopes)).toEqual(true);
    });

    it('hasAllScopes should return false on missing scope present', async () => {
        expect(hasAllScopes(testPayload, ['default', 'none'])).toEqual(false);
    });

    it('assertAllScopes should do nothing on scope present', async () => {
        expect(()=>assertAllScopes(testPayload, ['default'])).not.toThrow();

        const allScopes: Scope[] = ['default', 'none']
        expect(()=>assertAllScopes({
            ...testPayload,
            scopes: allScopes
        }, allScopes)).not.toThrow();
    });

    it('assertAllScopes should do nothing on scope present', async () => {
        expect(()=>assertAllScopes(testPayload, ['default', 'none'])).toThrow();
    });
});

