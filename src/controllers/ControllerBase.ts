import { Controller } from 'tsoa';
import { ICrudService } from '../infrastructure';

export default abstract class ControllerBase<T> extends Controller{
    abstract get service():ICrudService<T>;

    public async getAll(): Promise<T[]>{
        return await this.service.getAll();                
    }

    public async getById(id: string): Promise<T> {
        const entity = await this.service.getById(id)
        if (!entity) {
            this.setStatus(404);
            return (null as any);
        } else {
            return entity as T;
        }
    }
    
    public async create(model: T): Promise<T> {
        const entity = await this.service.create(model);
        this.setStatus(201);
        return entity;
    }


    public async update(id: string, model: T): Promise<T> {
        return await this.service.update({ id, ...(model as any) });
    }

    public async delete(id:string):Promise<void>{
        await this.service.delete(id);        
    }
}