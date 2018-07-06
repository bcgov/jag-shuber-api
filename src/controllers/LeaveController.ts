import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { Leave } from '../models/Leave';
import { LeaveService } from '../services/LeaveService';

@Route('leaves')
export class LeaveController extends ControllerBase<Leave> {
    get service(){
        return new LeaveService();
    }

    @Get()
    public getLeaves(){        
        return super.getAll();              
    }

    @Get('{id}')
    public getLeaveById(id: string) {
        return super.getById(id);
    }
    
    @Post()
    public createLeave(@Body() model: Leave) {
        return super.create(model);
    }

    @Put('{id}')
    public updateLeave(@Path() id: string, @Body() model: Leave) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteLeave(@Path() id:string){
        return super.delete(id);
    }
}