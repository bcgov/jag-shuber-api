import { TokenPayload } from '../common/authentication';

/**
 * The CurrentUser object is used here to allow us to inject the 
 * current user token into classes using dependency injection
 * since classes are actual types versus an interface or generics
 * that are for typing information only.
 *
 * @export
 * @class CurrentUser
 */
export class CurrentUser {
    get token(){
        return this._token;
    }

    get displayName(){
        const { displayName = 'UNKNOWN_USER' } = this.token;
        return displayName;        
    }

    constructor(private _token: TokenPayload = {}) {        
    }
}