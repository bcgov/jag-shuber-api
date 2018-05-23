import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Courthouse } from '../models/Courthouse';
import { CourthouseService } from '../services/CourthouseService';
import ControllerBase from './ControllerBase';

@Route('courthouses')
export class CourthouseController extends ControllerBase<Courthouse> {

    get service(){
        return new CourthouseService();
    }

    @Get()
    public getCourthouses(){
        return super.getAll();              
    }

    @Get('{id}')
    public getCourthouseById(id: string){
        return super.getById(id);
    }
    
    @Post()
    public createCourthouse(@Body() model: Courthouse){
        return super.create(model);
    }


    @Put('{id}')
    public updateCourthouse(@Path() id: string, @Body() model: Courthouse) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteCourthouse(@Path() id:string){
        return super.delete(id);
    }
}