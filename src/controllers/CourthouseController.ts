import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Courthouse } from '../models/Courthouse';
import { CourthouseService } from '../services/CourthouseService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';
@Route('courthouses')
@Security('jwt')
@AutoWired
export class CourthouseController extends ControllerBase<Courthouse,CourthouseService> {

    @Inject
    protected serviceInstance!:CourthouseService;

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