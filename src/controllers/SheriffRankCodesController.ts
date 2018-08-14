import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { SheriffRankCode } from '../models/SheriffRankCode';
import { SheriffRankCodeService } from '../services/SheriffRankCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';

@Route('codes/sheriffrank')
@Security('jwt')
export class SheriffRankCodesController extends ControllerBase<SheriffRankCode> {

    get service(){
        return new SheriffRankCodeService();
    }

    @Get()
    public getSheriffRankCodes(){
        return this.service.getAll();
    }

}