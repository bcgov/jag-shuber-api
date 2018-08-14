import { Courthouse } from '../models/Courthouse';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { ServiceBase } from '../infrastructure/ServiceBase';


export class UserService extends ServiceBase<Courthouse> {
    getAll(): Promise<Courthouse[]> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<Courthouse | undefined> {
        throw new Error('Method not implemented.');
    }
    create(entity: Partial<Courthouse>): Promise<Courthouse> {
        throw new Error('Method not implemented.');
    }
    update(entity: Partial<Courthouse>): Promise<Courthouse> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    getCurrentUser(){
        return this.currentUser;
    }
}