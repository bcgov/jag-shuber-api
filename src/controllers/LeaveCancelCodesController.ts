import { Get, Route } from 'tsoa';
import ControllerBase from './ControllerBase';
import { LeaveCancelCode } from '../models/LeaveCancelCode';
import { LeaveCancelCodeService } from '../services/LeaveCancelCodeService';

@Route('codes/leave-cancel')
export class LeaveCancelCodesController extends ControllerBase<LeaveCancelCode> {

    get service() {
        return new LeaveCancelCodeService();
    }

    @Get()
    public getLeaveCancelTypes() {
        return this.service.getAll();
    }
}