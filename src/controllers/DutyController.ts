import { Body, Delete, Get, Path, Post, Put, Query, Route, BodyProp } from 'tsoa';
import { Duty } from '../models/Duty';
import { SheriffDuty } from '../models/SheriffDuty';
import { DutyService } from '../services/DutyService';
import ControllerBase from '../infrastructure/ControllerBase';
import { DutyImportDefaultsRequest } from '../models/DutyImportDefaultsRequest';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('Duty')
@Security('jwt')
@AutoWired
export class DutyController extends ControllerBase<Duty, DutyService> {

    @Inject
    protected serviceInstance!: DutyService;


    @Get()
    public getDuties(@Query() locationId?: string, @Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAll(locationId, startDate, endDate);
    }

    @Get('{id}')
    public getDutyById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createDuty(@Body() model: Duty) {
        return super.create(model);
    }


    @Put('{id}')
    public updateDuty(@Path() id: string, @Body() model: Duty) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteDuty(@Path() id: string) {
        return super.delete(id);
    }

    @Post('/import')
    public importDefaultDuties(@Body() body: DutyImportDefaultsRequest) {
        return this.service.importDefaults(body);
    }
}