import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { EscortRun } from '../models/EscortRun';
import { EscortRunService } from '../services/EscortRunService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('escort-runs')
@Security('jwt')
@AutoWired
export class EscortRunController extends ControllerBase<EscortRun, EscortRunService> {

    @Inject
    protected serviceInstance!: EscortRunService;

    @Get()
    public getEscortRuns(@Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Get('{id}')
    public getEscortRunById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createEscortRun(@Body() model: EscortRun) {
        return super.create(model);
    }


    @Put('{id}')
    public updateEscortRun(@Path() id: string, @Body() model: EscortRun) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteEscortRun(@Path() id: string) {
        return super.delete(id);
    }
}