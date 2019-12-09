import { ServiceBase } from '../infrastructure/ServiceBase';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class UserService extends ServiceBase<{}> {
    getCurrentUser(){
        return this.currentUser;
    }
}