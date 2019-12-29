import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { RoleFrontendScopeService } from '../services/RoleFrontendScopeService';
import { RoleFrontendScope } from '../models/RoleFrontendScope';

@Route('RoleFrontendScope')
@Security('jwt', ['admin:user:roles'])
@AutoWired
export class RoleFrontendScopeController extends ControllerBase<any, RoleFrontendScopeService> {
    @Inject
    protected serviceInstance!: RoleFrontendScopeService;

    @Get()
    public getRoleFrontendScopes(){
        return super.getAll();
    }

    @Get('{id}')
    public getRoleFrontendScopeById(id: string){
        return super.getById(id);
    }

    @Post()
    public createRoleFrontendScope(@Body() model: RoleFrontendScope){
        return super.create(model);
    }

    @Put('{id}')
    public updateRoleFrontendScope(@Path() id: string, @Body() model: RoleFrontendScope) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteRoleFrontendScope(@Path() id:string){
        return super.delete(id);
    }
}
