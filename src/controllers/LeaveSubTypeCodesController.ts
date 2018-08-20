import { Get, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { LeaveSubCode } from '../models/LeaveSubCode';
import { LeaveSubCodeService } from '../services/LeaveSubCodeService';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';


@Route('codes/leave-sub-type')
@Security('jwt')
@AutoWired
export class LeaveSubTypeCodesController extends ControllerBase<LeaveSubCode, LeaveSubCodeService> {

    @Inject
    protected serviceInstance!: LeaveSubCodeService;

    @Get()
    public getLeaveSubCodes() {
        return this.service.getAll();
    }
}