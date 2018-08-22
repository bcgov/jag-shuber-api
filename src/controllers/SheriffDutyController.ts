import { Body, Delete, Get, Path, Post, Put, Query, Route, BodyProp } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { SheriffDutyService } from '../services/SheriffDutyService';
import { SheriffDuty } from '../models/SheriffDuty';
import { AutoWired, Inject } from 'typescript-ioc';
import { Security } from '../authentication';

@Route('SheriffDuty')
@Security('jwt')
@AutoWired
export class SheriffDutyController extends ControllerBase<SheriffDuty, SheriffDutyService> {

    @Inject
    protected serviceInstance!: SheriffDutyService;

    @Get()
    public getSheriffDuties() {
        return this.service.getAll();
    }

    @Get('{id}')
    public getSheriffDutyById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createSheriffDuty(@Body() model: SheriffDuty) {
        return super.create(model);
    }


    @Put('{id}')
    public updateSheriffDuty(@Path() id: string, @Body() model: SheriffDuty) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteSheriffDuty(@Path() id: string) {
        return super.delete(id);
    }
}