import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { SheriffLocation } from '../models/SheriffLocation';
import { SheriffLocationService } from '../services/SheriffLocationService';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';


@Route('SheriffLocation')
@Security('jwt')
@AutoWired
export class SheriffLocationController extends ControllerBase<SheriffLocation, SheriffLocationService> {

    @Inject
    protected serviceInstance!: SheriffLocationService;

    @Get()
    public getSheriffLocations() {
        return super.getAll();
    }

    @Get('{id}')
    public getSheriffLocationById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createSheriffLocation(@Body() model: SheriffLocation) {
        return super.create(model);
    }

    @Put('{id}')
    public updateSheriffLocation(@Path() id: string, @Body() model: SheriffLocation) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteSheriffLocation(@Path() id: string) {
        return super.delete(id);
    }
}