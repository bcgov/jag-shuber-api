import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { ApiScopeService } from '../services/ApiScopeService';
import { ApiScope } from '../models/ApiScope';

@Route('ApiScope')
@Security('jwt')
@AutoWired
export class ApiScopeController extends ControllerBase<any, ApiScopeService> {
    @Inject
    protected serviceInstance!: ApiScopeService;

    @Security('jwt', ['system:scopes:read'])
    @Get()
    public getApiScopes(){
        return super.getAll();
    }

    @Security('jwt', ['system:scopes:read'])
    @Get('{id}')
    public getApiScopeById(id: string){
        return super.getById(id);
    }

    @Security('jwt', ['system:scopes'])
    @Post()
    public createApiScope(@Body() model: ApiScope){
        return super.create(model);
    }

    @Security('jwt', ['system:scopes'])
    @Put('{id}')
    public updateApiScope(@Path() id: string, @Body() model: ApiScope) {
        return super.update(id,model);
    }

    @Security('jwt', ['system:scopes'])
    @Delete('{id}')
    public deleteApiScope(@Path() id:string){
        return super.delete(id);
    }
}
