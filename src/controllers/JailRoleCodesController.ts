import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { JailRoleCode } from '../models/JailRoleCode';
import { JailRoleCodeService } from '../services/JailRoleCodeService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('codes/jailroles')
@Security('jwt')
@AutoWired
export class JailRoleCodesController extends ControllerBase<JailRoleCode, JailRoleCodeService> {

    @Inject
    protected serviceInstance!: JailRoleCodeService;

    @Get()
    public getJailRoleCodes() {
        return this.service.getAll();
    }

}