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
    public getCourtrooms(@Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Get('{id}')
    public getCourtroomById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createCourtroom(@Body() model: Courtroom) {
        return super.create(model);
    }

    @Post('{id}/expire')
    public expireCourtroom(@Path() id: string) {
        return this.service.expire(id);
    }

    @Post('{id}/unexpire')
    public unexpireCourtroom(@Path() id: string) {
        return this.service.unexpire(id);
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
