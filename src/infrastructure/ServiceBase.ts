import { v4 as uuid } from 'uuid';
import { CrudService } from "./CrudService";
import moment, { Moment, parseZone } from 'moment';
import { setTime } from '../common/TimeUtils'
import { AutoWired, Inject } from 'typescript-ioc';
import { CurrentUser } from './CurrentUser';

@AutoWired
export abstract class ServiceBase<T> extends CrudService<T> {
    @Inject
    private _currentUser!:CurrentUser;
    protected currentUser(){
        return this._currentUser;
    }

    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T | undefined>;
    abstract create(entity: Partial<T>): Promise<T>
    abstract update(entity: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<void>;

    generateUuid(): string {
        return uuid();
    }

    filterNullValues<T>(object: any): T {
        let returnObj = {};
        Object.keys(object)
            .filter(k => object[k] !== null)
            .forEach(k => {
                returnObj[k] = object[k];
            })
        return returnObj as T;
    }
}