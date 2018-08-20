import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Courtroom } from '../models/Courtroom';
import { CourtroomService } from '../services/CourtroomService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('courtrooms')
@Security('jwt')
@AutoWired
export class CourtroomController extends ControllerBase<Courtroom, CourtroomService> {

    @Inject
    protected serviceInstance!: CourtroomService;

    @Get()
    public getCourtrooms(@Query() courthouseId?: string) {
        return this.service.getAll(courthouseId);
    }

    @Get('{id}')
    public getCourtroomById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createCourtroom(@Body() model: Courtroom) {
        return super.create(model);
    }


    @Put('{id}')
    public updateCourtroom(@Path() id: string, @Body() model: Courtroom) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteCourtroom(@Path() id: string) {
        return super.delete(id);
    }
}