import { Controller } from 'tsoa';
import { CrudService } from './CrudService';
import { AutoWired, Inject } from 'typescript-ioc';
import { CurrentUser } from './CurrentUser';

@AutoWired
export default abstract class ControllerBase<T,TService extends CrudService<T> = CrudService<T>> extends Controller{
    
    @Inject
    private _currentUser!:CurrentUser;
    /**
     * The user associated with the current request
     *
     * @readonly
     * @protected
     * @memberof ControllerBase
     */
    protected get currentUser(){
        return this._currentUser;
    }

    protected serviceInstance!: TService;
    get service():TService{
        return this.serviceInstance;
    }

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
