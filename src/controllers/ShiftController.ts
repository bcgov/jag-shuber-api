import { Body, Delete, Get, Path, Post, Put, Query, Route } from 'tsoa';
import { Shift } from '../models/Shift';
import { ShiftService } from '../services/ShiftService';
import ControllerBase from '../infrastructure/ControllerBase';
import { MultipleShiftUpdateRequest } from '../models/MultipleShiftUpdateRequest';
import { ShiftCopyOptions } from '../models/ShiftCopyOptions';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';

@Route('Shifts')
@Security('jwt')
@AutoWired
export class ShiftController extends ControllerBase<Shift, ShiftService> {

    @Inject
    protected serviceInstance!: ShiftService;

    @Get()
    public getShifts(@Query() courthouseId?: string) {
        return this.service.getAll(courthouseId);
    }

    @Get('{id}')
    public getShiftById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createShift(@Body() model: Shift) {
        return super.create(model);
    }


    @Put('{id}')
    public updateShift(@Path() id: string, @Body() model: Shift) {
        return super.update(id, model);
    }

    @Delete('{id}')
    public deleteShift(@Path() id: string) {
        return super.delete(id);
    }

    @Post('multiple')
    public updateMultipleShifts(@Body() model: MultipleShiftUpdateRequest) {
        return this.service.updateMultipleShifts(model);
    }

    @Post('copy')
    public copyShifts(@Body() model: ShiftCopyOptions) {
        return this.service.copyShifts(model);
    }
}