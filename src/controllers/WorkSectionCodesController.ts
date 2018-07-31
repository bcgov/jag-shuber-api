import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { WorkSectionCode } from '../models/WorkSectionCode';
import { WorkSectionCodeService } from '../services/WorkSectionCodeService';
import ControllerBase from './ControllerBase';
import { Security } from '../authentication';

@Route('codes/worksection')
@Security('jwt')
export class WorkSectionCodesController extends ControllerBase<WorkSectionCode> {

    get service(){
        return new WorkSectionCodeService();
    }

    @Get()
    public getWorkSectionCodes(){
        return this.service.getAll();
    }

}