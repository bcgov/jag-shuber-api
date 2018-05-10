import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Assignment } from '../models/Assignment';
import { AssignmentService } from '../services/AssignmentService';
import ControllerBase from './ControllerBase';

@Route('Assignments')
export class AssignmentController extends ControllerBase<Assignment> {

    get service() {
        return new AssignmentService();
    }

    @Get()
    public getAssignments(@Query() courthouseId?: string, @Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAll(courthouseId, startDate, endDate);
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
    public expireAssignment(@Path() id:string){
        return this.service.expire(id);
    }

    @Delete('{id}')
    public deleteAssignment(@Path() id: string) {
        return super.delete(id);
    }
}