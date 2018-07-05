import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveSubCode } from '../models/LeaveSubCode';
import { LeaveSubCodeService } from '../services/LeaveSubCodeService';

@Route('codes/leave-sub-type')
export class LeaveSubTypeCodesController extends ControllerBase<LeaveSubCode> {

    get service() {
        return new LeaveSubCodeService();
    }

    @Get()
    public getLeaveSubCodes() {
        return this.service.getAll();
    }
}