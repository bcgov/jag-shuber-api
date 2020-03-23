import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { OtherAssignCode } from '../models/OtherAssignCode';
import { OtherAssignCodeService } from '../services/OtherAssignCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/otherassign')
@Security('jwt')
@AutoWired
export class OtherAssignCodesController extends ControllerBase<OtherAssignCode, OtherAssignCodeService> {

    @Inject
    protected serviceInstance!: OtherAssignCodeService;

    @Get()
    public getOtherAssignCodes(@Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Post()
    public createOtherAssignCode(@Body() model: OtherAssignCode) {
        return super.create(model);
    }

    @Post('{id}/expire')
    public expireOtherAssignCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Post('{id}/unexpire')
    public unexpireOtherAssignCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Put('{id}')
    public updateOtherAssignCode(@Path() id: string, @Body() model: OtherAssignCode) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteOtherAssignCode(@Path() id: string) {
        return this.service.expire(id);
    }

}