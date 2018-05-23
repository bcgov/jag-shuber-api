import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Sheriff } from '../models/Sheriff';
import { SheriffService } from '../services/SheriffService';
import ControllerBase from './ControllerBase';

@Route('sheriffs')
export class SheriffController extends ControllerBase<Sheriff> {
 
    get service(){
        return new SheriffService();
    }
 
    @Get()
    public getSheriffs(@Query() courthouseId?:string){
        return this.service.getAll(courthouseId);
    }

    @Get('{id}')
    public getSheriffById(id: string){
        return super.getById(id);
    }
    
    @Post()
    public createSheriff(@Body() model: Sheriff){
        return super.create(model);
    }


    @Put('{id}')
    public updateSheriff(@Path() id: string, @Body() model: Sheriff) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteSheriff(@Path() id:string){
        return super.delete(id);
    }
}