import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { SheriffRankCode } from '../models/SheriffRankCode';
import { SheriffRankCodeService } from '../services/SheriffRankCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/sheriffrank')
@Security('jwt')
@AutoWired
export class SheriffRankCodesController extends ControllerBase<SheriffRankCode, SheriffRankCodeService> {

    @Inject
    protected serviceInstance!: SheriffRankCodeService;

    @Get()
    public getSheriffRankCodes() {
        return this.service.getAll();
    }

}