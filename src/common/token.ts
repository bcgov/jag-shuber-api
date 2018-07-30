import decode_jwt from 'jwt-decode';

export function decodeJwt<T>(token:string):T{
    return decode_jwt<T>(token);
}