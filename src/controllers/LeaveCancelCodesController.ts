import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveCancelReasonCode } from '../models/LeaveCancelReasonCode';
import { LeaveCancelReasonCodeService } from '../services/LeaveCancelCodeService';
import { Security } from '../authentication';

@Route('codes/leave-cancel')
@Security('jwt')
export class LeaveCancelCodesController extends ControllerBase<LeaveCancelReasonCode> {

    get service() {
        return new LeaveCancelReasonCodeService();
    }

    @Get()
    public getLeaveCancelReasonCodes() {
        return this.service.getAll();
    }
}