import { createToken } from '../infrastructure/token';
import { TokenPayload } from '../common/authentication';

export class TokenService {

    generateToken(tokenPayload: TokenPayload): any {
        // Todo: Generate scopes based on database table
        return createToken({
            scopes: ['default'],
            ...tokenPayload
        });
    }
}