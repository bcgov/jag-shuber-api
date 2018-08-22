import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { WorkSectionCode } from '../models/WorkSectionCode';
import { WorkSectionCodeService } from '../services/WorkSectionCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/worksection')
@Security('jwt')
@AutoWired

export class WorkSectionCodesController extends ControllerBase<WorkSectionCode, WorkSectionCodeService> {

    @Inject
    protected serviceInstance!: WorkSectionCodeService;

    @Get()
    public getWorkSectionCodes() {
        return this.service.getAll();
    }

}