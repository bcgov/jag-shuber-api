import { ClientBase } from 'pg';
import { Container } from 'typescript-ioc';
import { DatabaseService } from './DatabaseService';

export default class TransactionContext {

    get client() {
        return this._client;
    }

    constructor(private _client: ClientBase) {
    }

    private getServiceImpl<T extends DatabaseService<any>>(sourceClass: Function) : T {
        const service = Container.get(sourceClass) as T;
        if (this.client) {
            service.dbClient = this.client;
        }
        return service;
    } 


    /**
     * Gets a DatabaseService from the Container injecting the current Database
     * Client being used for the transaction.  Expects that T and sourceClass 
     * are the service class that you want.
     *
     * @template T
     * @param {Function} sourceClass
     * @returns {T} Instance of T
     * @memberof TransactionContext
     */
    get getService():<T extends DatabaseService<any>>(sourceClass: Function) => T {
        return this.getServiceImpl.bind(this);
    }
}