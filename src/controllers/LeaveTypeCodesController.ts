import { Get, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { LeaveCode } from '../models/LeaveCode';
import { LeaveCodeService } from '../services/LeaveCodeService';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';


@Route('codes/leave-type')
@Security('jwt')
@AutoWired
export class LeaveTypeCodesController extends ControllerBase<LeaveCode, LeaveCodeService> {

    @Inject
    protected serviceInstance!: LeaveCodeService;

    @Get()
    public getLeaveTypes() {
        return this.service.getAll();
    }
}