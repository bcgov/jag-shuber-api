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

    @Put('{id}')
    public updateCourtRoleCode(@Path() id: string, @Body() model: CourtRoleCode) {
        return super.update(id, model);
    }

    @Post('{id}')
    public expireCourtRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

    @Delete('{id}')
    public deleteCourtRoleCode(@Path() id: string) {
        return this.service.expire(id);
    }

}