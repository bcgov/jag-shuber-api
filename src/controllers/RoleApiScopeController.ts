import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { RoleApiScopeService } from '../services/RoleApiScopeService';
import { RoleApiScope } from '../models/RoleApiScope';

@Route('RoleApiScope')
@Security('jwt')
@AutoWired
export class RoleApiScopeController extends ControllerBase<any, RoleApiScopeService> {
    @Inject
    protected serviceInstance!: RoleApiScopeService;

    @Get()
    public getRoleApiScopes(){
        return super.getAll();
    }

    @Get('{id}')
    public getRoleApiScopeById(id: string){
        return super.getById(id);
    }

    @Post()
    public createRoleApiScope(@Body() model: RoleApiScope){
        return super.create(model);
    }

    @Put('{id}')
    public updateRoleApiScope(@Path() id: string, @Body() model: RoleApiScope) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteRoleApiScope(@Path() id:string){
        return super.delete(id);
    }
}
