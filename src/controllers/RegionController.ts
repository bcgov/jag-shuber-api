import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Region } from '../models/Region';
import { RegionService } from '../services/RegionService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('regions')
@Security('jwt')
@AutoWired
export class RegionController extends ControllerBase<Region, RegionService> {

    @Inject
    protected serviceInstance!: RegionService;

    @Get()
    public getRegions() {
        return super.getAll();
    }

    @Get('{id}')
    public getRegionById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createRegion(@Body() model: Region) {
        return super.create(model);
    }

    @Put('{id}')
    public updateRegion(@Path() id: string, @Body() model: Region) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteRegion(@Path() id: string) {
        return super.delete(id);
    }
}