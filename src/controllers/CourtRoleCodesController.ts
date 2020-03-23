import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { CourtRoleCode } from '../models/CourtRoleCode';
import { CourtRoleCodeService } from '../services/CourtRoleCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/courtroles')
@Security('jwt')
@AutoWired
export class CourtRoleCodesController extends ControllerBase<CourtRoleCode, CourtRoleCodeService> {

    @Inject
    protected serviceInstance!: CourtRoleCodeService;

    @Get()
    public getCourtRoleCodes(@Query() locationId?: string) {
        return this.service.getAll(locationId);
    }

    @Post()
    public createCourtRoleCode(@Body() model: CourtRoleCode) {
        return super.create(model);
    }

    @Post('{id}/expire')
    public expireCourtRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Post('{id}/unexpire')
    public unexpireCourtRoleCode(@Path() id: string) {
        return this.service.unexpire(id);
    }

    @Put('{id}')
    public updateCourtRoleCode(@Path() id: string, @Body() model: CourtRoleCode) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteCourtRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

}