import { Body, Delete, Get, Path, Post, Put, Query, Route, Request } from 'tsoa';
import { Assignment } from '../models/Assignment';
import { AssignmentService } from '../services/AssignmentService';
import ControllerBase from '../infrastructure/ControllerBase';
import {Request as KoaRequest} from 'koa';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';
import { ERROR_DEPRECATED_DELETE_ASSIGNMENT } from '../common/Messages';

@Route('Assignments')
@Security('jwt')
@AutoWired
export class AssignmentController extends ControllerBase<Assignment,AssignmentService> {
    @Inject
    protected serviceInstance!:AssignmentService;

    @Get()
    public getAssignments(@Query() locationId?: string, @Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAll(locationId, { startDate, endDate });
    }

    @Get('{id}')
    public getAssignmentById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createAssignment(@Body() model: Assignment) {
        return super.create(model);
    }

    @Put('{id}')
    public updateAssignment(@Path() id: string, @Body() model: Assignment) {
        return super.update(id, model);
    }

    @Post('{id}')
    public expireAssignment(@Path() id: string) {
        return this.service.expire(id);
    }

    
    /**
     * @deprecated Use expireAssignment Instead
     *
     * @param {string} id
     * @returns
     * @memberof AssignmentController
     */
    @Delete('{id}')
    public deleteAssignment(@Path() id: string, @Request() request:KoaRequest) {
        request.ctx.throw(ERROR_DEPRECATED_DELETE_ASSIGNMENT,410);
    }
}