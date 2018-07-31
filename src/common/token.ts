import decode_jwt from 'jwt-decode';

export function decodeJwt<T>(token?: string): T | undefined {
    if (token) {
        return decode_jwt<T>(token);
    }
    return undefined;
}