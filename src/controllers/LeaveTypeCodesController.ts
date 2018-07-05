import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveCode } from '../models/LeaveCode';
import { LeaveCodeService } from '../services/LeaveCodeService';

@Route('codes/leave-type')
export class LeaveTypeCodesController extends ControllerBase<LeaveCode> {

    get service() {
        return new LeaveCodeService();
    }

    @Get()
    public getLeaveTypes() {
        return this.service.getAll();
    }
}