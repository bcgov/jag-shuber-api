import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { ApiScopeService } from '../services/ApiScopeService';
import { ApiScope } from '../models/ApiScope';

@Route('ApiScope')
@Security('jwt', ['system:scopes'])
@AutoWired
export class ApiScopeController extends ControllerBase<any, ApiScopeService> {
    @Inject
    protected serviceInstance!: ApiScopeService;

    @Get()
    public getApiScopes(){
        return super.getAll();
    }

    @Get('{id}')
    public getApiScopeById(id: string){
        return super.getById(id);
    }

    @Post()
    public createApiScope(@Body() model: ApiScope){
        return super.create(model);
    }

    @Put('{id}')
    public updateApiScope(@Path() id: string, @Body() model: ApiScope) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteApiScope(@Path() id:string){
        return super.delete(id);
    }
}
