import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { RolePermissionService } from '../services/RolePermissionService';
import { RolePermission } from '../models/RolePermission';

@Route('RolePermission')
@Security('jwt')
@AutoWired
export class RolePermissionController extends ControllerBase<any, RolePermissionService> {
    @Inject
    protected serviceInstance!: RolePermissionService;

    @Get()
    public getRolePermissions(){
        return super.getAll();
    }

    @Get('{id}')
    public getRolePermissionById(id: string){
        return super.getById(id);
    }

    @Security('jwt', ['roles:manage'])
    @Post()
    public createRolePermission(@Body() model: RolePermission){
        return super.create(model);
    }

    @Security('jwt', ['roles:manage'])
    @Put('{id}')
    public updateRolePermission(@Path() id: string, @Body() model: RolePermission) {
        return super.update(id,model);
    }

    @Security('jwt', ['roles:manage'])
    @Delete('{id}')
    public deleteRolePermission(@Path() id:string){
        return super.delete(id);
    }
}
