import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { OtherAssignCode } from '../models/OtherAssignCode';
import { OtherAssignCodeService } from '../services/OtherAssignCodeService';
import ControllerBase from './ControllerBase';

@Route('codes/otherassign')
export class OtherAssignCodesController extends ControllerBase<OtherAssignCode> {

    get service(){
        return new OtherAssignCodeService();
    }

    @Get()
    public getOtherAssignCodes(){
        return this.service.getAll();
    }

}