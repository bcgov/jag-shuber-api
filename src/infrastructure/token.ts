import * as jwt from 'jsonwebtoken';
import { TokenPayload } from '../common/authentication';

export const JWT_SECRET: string = process.env.JWT_SECRET || "d3vS3cr37";

/**
 * Creates a compact JWT token string that from the given TokenPayload.
 * This token string can then be used in subsequent requests via headers
 * or cookies.
 *
 * @export
 * @param {TokenPayload} payload
 * @param {string} [secret=JWT_SECRET]
 * @param {jwt.SignOptions} [signOptions]
 * @returns {(Promise<string | undefined>)}
 */
export async function createToken(payload: TokenPayload,secret:string=JWT_SECRET, signOptions?: jwt.SignOptions): Promise<string | undefined> {
    if (payload) {
        return jwt.sign({
            scopes: [],
            ...payload
        }, secret, {
                algorithm: 'HS256',
                issuer: 'jag-shuber-api',
                audience: 'jag-shuber-client',
                expiresIn: '30 minutes',
                ...signOptions
            })
    }
}

/**
 * Verifies a compact JWT token string returning the TokenPayload if successful
 * Throw an exception if the token can't be verified.
 * 
 * @export
 * @param {string} token
 * @param {string} [secret=JWT_SECRET]
 * @returns {Promise<TokenPayload>}
 */
export async function verifyToken(token: string, secret: string = JWT_SECRET): Promise<TokenPayload> {
    return await new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error("No token provided"))
        }

        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded as TokenPayload);
            }
        });
    })
}
