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

    @Security('jwt', ['roles:read'])
    @Get()
    public getRoleApiScopes(){
        return super.getAll();
    }

    @Security('jwt', ['roles:read'])
    @Get('{id}')
    public getRoleApiScopeById(id: string){
        return super.getById(id);
    }

    @Security('jwt', ['roles:manage'])
    @Post()
    public createRoleApiScope(@Body() model: RoleApiScope){
        return super.create(model);
    }

    @Security('jwt', ['roles:manage'])
    @Put('{id}')
    public updateRoleApiScope(@Path() id: string, @Body() model: RoleApiScope) {
        return super.update(id,model);
    }

    @Security('jwt', ['roles:manage'])
    @Delete('{id}')
    public deleteRoleApiScope(@Path() id:string){
        return super.delete(id);
    }
}
