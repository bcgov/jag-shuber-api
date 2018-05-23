import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { SheriffRankCode } from '../models/SheriffRankCode';
import { SheriffRankCodeService } from '../services/SheriffRankCodeService';
import ControllerBase from './ControllerBase';

@Route('codes/sheriffrank')
export class SheriffRankCodesController extends ControllerBase<SheriffRankCode> {

    get service(){
        return new SheriffRankCodeService();
    }

    @Get()
    public getSheriffRankCodes(){
        return this.service.getAll();
    }

}