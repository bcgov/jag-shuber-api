import { Body, Delete, Get, Path, Post, Put, Query, Route, BodyProp } from 'tsoa';
import { Duty } from '../models/Duty';
import { SheriffDuty } from '../models/SheriffDuty';
import { DutyService } from '../services/DutyService';
import ControllerBase from './ControllerBase';
import { DutyImportDefaultsRequest } from '../models/DutyImportDefaultsRequest';
import { Security } from '../authentication';

@Route('Duty')
@Security('jwt')
export class DutyController extends ControllerBase<Duty> {

    get service() {
        return new DutyService();
    }

    @Get()
    public getDuties() {
        return this.service.getAll();
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