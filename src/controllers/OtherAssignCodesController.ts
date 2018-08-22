import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { OtherAssignCode } from '../models/OtherAssignCode';
import { OtherAssignCodeService } from '../services/OtherAssignCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/otherassign')
@Security('jwt')
@AutoWired
export class OtherAssignCodesController extends ControllerBase<OtherAssignCode, OtherAssignCodeService> {

    @Inject
    protected serviceInstance!: OtherAssignCodeService;

    @Get()
    public getOtherAssignCodes() {
        return this.service.getAll();
    }

}