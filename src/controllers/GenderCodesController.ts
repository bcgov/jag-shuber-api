import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { GenderCode } from '../models/GenderCode';
import { GenderCodeService } from '../services/GenderCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/gender')
@Security('jwt')
@AutoWired
export class GenderCodesController extends ControllerBase<GenderCode, GenderCodeService> {

    @Inject
    protected serviceInstance!: GenderCodeService;

    @Get()
    public getGenderCodes() {
        return super.getAll();
    }

}