import { Body, Delete, Get, Path, Post, Put, Route } from 'tsoa';
import { Location } from '../models/Location';
import { LocationService } from '../services/LocationService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';
@Route('locations')
@Security('jwt')
@AutoWired
export class LocationController extends ControllerBase<Location,LocationService> {

    @Inject
    protected serviceInstance!:LocationService;

    @Get()
    public getLocations() {
        return super.getAll();
    }

    @Get('{id}')
    public getLocationById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createLocation(@Body() model: Location) {
        return super.create(model);
    }

    @Put('{id}')
    public updateLocation(@Path() id: string, @Body() model: Location) {
        return super.update(id,model);
    }

    @Delete('{id}')
    public deleteLocation(@Path() id:string) {
        return super.delete(id);
    }
}
