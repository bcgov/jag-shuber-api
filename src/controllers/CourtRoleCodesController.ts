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
    public getCourtRoleCodes() {
        return super.getAll();
    }

}