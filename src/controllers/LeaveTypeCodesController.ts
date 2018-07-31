import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveCode } from '../models/LeaveCode';
import { LeaveCodeService } from '../services/LeaveCodeService';
import { Security } from '../authentication';

@Route('codes/leave-type')
@Security('jwt')
export class LeaveTypeCodesController extends ControllerBase<LeaveCode> {

    get service() {
        return new LeaveCodeService();
    }

    @Get()
    public getLeaveTypes() {
        return this.service.getAll();
    }
}