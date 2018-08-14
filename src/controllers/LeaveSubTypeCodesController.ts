import { Get, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { LeaveSubCode } from '../models/LeaveSubCode';
import { LeaveSubCodeService } from '../services/LeaveSubCodeService';
import { Security } from '../authentication';

@Route('codes/leave-sub-type')
@Security('jwt')
export class LeaveSubTypeCodesController extends ControllerBase<LeaveSubCode> {

    get service() {
        return new LeaveSubCodeService();
    }

    @Get()
    public getLeaveSubCodes() {
        return this.service.getAll();
    }
}