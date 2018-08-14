import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { GenderCode } from '../models/GenderCode';
import { GenderCodeService } from '../services/GenderCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';

@Route('codes/gender')
@Security('jwt')
export class GenderCodesController extends ControllerBase<GenderCode> {

    get service(){
        return new GenderCodeService();
    }

    @Get()
    public getGenderCodes(){
        return super.getAll();
    }

}