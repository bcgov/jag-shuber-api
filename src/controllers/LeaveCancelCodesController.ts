import { Get, Route } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { LeaveCancelReasonCode } from '../models/LeaveCancelReasonCode';
import { LeaveCancelReasonCodeService } from '../services/LeaveCancelCodeService';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';


@Route('codes/leave-cancel')
@Security('jwt')
@AutoWired
export class LeaveCancelCodesController extends ControllerBase<LeaveCancelReasonCode, LeaveCancelReasonCodeService> {

    @Inject
    protected serviceInstance!: LeaveCancelReasonCodeService;

    @Get()
    public getLeaveCancelReasonCodes() {
        return this.service.getAll();
    }
}