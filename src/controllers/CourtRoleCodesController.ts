import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { CourtRoleCode } from '../models/CourtRoleCode';
import { CourtRoleCodeService } from '../services/CourtRoleCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';

@Route('codes/courtroles')
@Security('jwt')
export class CourtRoleCodesController extends ControllerBase<CourtRoleCode> {

    get service(){
        return new CourtRoleCodeService();
    }

    @Get()
    public getCourtRoleCodes(){
        return super.getAll();
    }

}