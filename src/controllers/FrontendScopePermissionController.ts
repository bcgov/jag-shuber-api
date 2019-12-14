import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { FrontendScopePermissionService } from '../services/FrontendScopePermissionService';
import { FrontendScopePermission } from '../models/FrontendScopePermission';

@Route('FrontendScopePermission')
@Security('jwt')
@AutoWired
export class FrontendScopePermissionController extends ControllerBase<any, FrontendScopePermissionService> {
    @Inject
    protected serviceInstance!: FrontendScopePermissionService;

    @Get()
    public getFrontendScopePermissions(){
        return super.getAll();
    }

    @Get('{id}')
    public getFrontendScopePermissionById(id: string){
        return super.getById(id);
    }

    @Post()
    public createFrontendScopePermission(@Body() model: FrontendScopePermission){
        return super.create(model);
    }

    @Put('{id}')
    public updateFrontendScopePermission(@Path() id: string, @Body() model: FrontendScopePermission) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteFrontendScopePermission(@Path() id:string){
        return super.delete(id);
    }
}
