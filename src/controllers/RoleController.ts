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
import { RoleService } from '../services/RoleService';
import { Role } from '../models/Role';

@Route('Role')
@Security('jwt')
@AutoWired
export class RoleController extends ControllerBase<any, RoleService> {
    @Inject
    protected serviceInstance!: RoleService;

    @Get()
    public getRoles(){
        return super.getAll();
    }

    @Get('{id}')
    public getRoleById(id: string){
        return super.getById(id);
    }

    @Post()
    public createRole(@Body() model: Role){
        return super.create(model);
    }

    @Put('{id}')
    public updateRole(@Path() id: string, @Body() model: Role) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteRole(@Path() id:string){
        return super.delete(id);
    }
}
