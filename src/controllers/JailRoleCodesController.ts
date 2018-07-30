import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { JailRoleCode } from '../models/JailRoleCode';
import { JailRoleCodeService } from '../services/JailRoleCodeService';
import ControllerBase from './ControllerBase';
import { Security } from '../authentication';

@Route('codes/jailroles')
@Security('jwt')
export class JailRoleCodesController extends ControllerBase<JailRoleCode> {

    get service() {
        return new JailRoleCodeService();
    }

    @Get()
    public getJailRoleCodes() {
        return this.service.getAll();
    }

}