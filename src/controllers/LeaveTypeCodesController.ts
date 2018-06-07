import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveTypeCode } from '../models/LeaveTypeCode';
import { LeaveTypeCodeService } from '../services/LeaveTypeCodeService';

@Route('codes/leave-type')
export class LeaveTypeCodesController extends ControllerBase<LeaveTypeCode> {

    get service() {
        return new LeaveTypeCodeService();
    }

    @Get()
    public getLeaveTypes() {
        return this.service.getAll();
    }
}