import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Run } from '../models/Run';
import { RunService } from '../services/RunService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';

@Route('runs')
@Security('jwt')
export class RunController extends ControllerBase<Run> {

    get service(){
        return new RunService();
    }

    @Get()
    public getRuns(@Query() courthouseId?:string){
        return this.service.getAll(courthouseId);
    }

    @Get('{id}')
    public getRunById(id: string){
        return super.getById(id);
    }
    
    @Post()
    public createRun(@Body() model: Run){
        return super.create(model);
    }


    @Put('{id}')
    public updateRun(@Path() id: string, @Body() model: Run) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteRun(@Path() id:string){
        return super.delete(id);
    }
}