import { Courthouse } from '../models/Courthouse';
import { ServiceBase } from '../infrastructure/ServiceBase';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class UserService extends ServiceBase<Courthouse> {
    getCurrentUser(){
        return this.currentUser;
    }
}