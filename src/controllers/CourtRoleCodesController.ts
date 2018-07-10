import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { CourtRoleCode } from '../models/CourtRoleCode';
import { CourtRoleCodeService } from '../services/CourtRoleCodeService';
import ControllerBase from './ControllerBase';

@Route('codes/courtroles')
export class CourtRoleCodesController extends ControllerBase<CourtRoleCode> {

    get service(){
        return new CourtRoleCodeService();
    }

    @Get()
    public getCourtRoleCodes(){
        return this.service.getAll();
    }

}