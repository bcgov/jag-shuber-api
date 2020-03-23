import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { JailRoleCode } from '../models/JailRoleCode';
import { JailRoleCodeService } from '../services/JailRoleCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/jailroles')
@Security('jwt')
@AutoWired
export class JailRoleCodesController extends ControllerBase<JailRoleCode, JailRoleCodeService> {

    @Inject
    protected serviceInstance!: JailRoleCodeService;

    @Get()
    public getJailRoleCodes(@Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Post()
    public createJailRoleCode(@Body() model: JailRoleCode) {
        return super.create(model);
    }

    @Post('{id}/expire')
    public expireJailRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Post('{id}/unexpire')
    public unexpireJailRoleCode(@Path() id: string) {
        return this.service.unexpire(id);
    }

    @Put('{id}')
    public updateJailRoleCode(@Path() id: string, @Body() model: JailRoleCode) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteJailRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

}