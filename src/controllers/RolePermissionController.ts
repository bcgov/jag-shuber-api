import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Assignment } from '../models/Assignment';
import { DutyRecurrence } from '../models/DutyRecurrence';
import { AssignmentService } from '../services/AssignmentService';
import ControllerBase from '../infrastructure/ControllerBase';
import { DutyRecurrenceService } from '../services/DutyRecurrenceService';
import { Security } from '../authentication';
import { Inject, AutoWired } from 'typescript-ioc';
import { UserService } from '../services/UserService';
import { User } from '../models/User';
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

    @Post()
    public createRolePermission(@Body() model: RolePermission){
        return super.create(model);
    }

    @Put('{id}')
    public updateRolePermission(@Path() id: string, @Body() model: RolePermission) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteRolePermission(@Path() id:string){
        return super.delete(id);
    }
}
