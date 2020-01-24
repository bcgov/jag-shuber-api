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
    public getOtherAssignCodes() {
        return this.service.getAll();
    }

    @Post()
    public createOtherAssignCode(@Body() model: OtherAssignCode) {
        return super.create(model);
    }

    @Put('{id}')
    public updateOtherAssignCode(@Path() id: string, @Body() model: OtherAssignCode) {
        return super.update(id, model);
    }

    @Post('{id}')
    public expireOtherAssignCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Delete('{id}')
    public deleteOtherAssignCode(@Path() id: string) {
        return this.service.expire(id);
    }

}