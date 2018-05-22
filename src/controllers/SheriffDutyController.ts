import { Body, Delete, Get, Path, Post, Put, Query, Route, BodyProp } from 'tsoa';
import ControllerBase from './ControllerBase';
import { SheriffDutyService } from '../services/SheriffDutyService';
import { SheriffDuty } from '../models/SheriffDuty';
import { Sheriff } from '../models/Sheriff';

@Route('SheriffDuty')
export class SheriffDutyController extends ControllerBase<SheriffDuty> {

    get service() {
        return new SheriffDutyService();
    }

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