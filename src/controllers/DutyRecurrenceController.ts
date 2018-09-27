import { Body, Delete, Get, Path, Post, Put, Query, Route, Request } from 'tsoa';
import { Request as KoaRequest } from 'koa';
import { DutyRecurrence } from '../models/DutyRecurrence';
import { DutyRecurrenceService } from '../services/DutyRecurrenceService';
import ControllerBase from '../infrastructure/ControllerBase';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';
import { ERROR_DEPRECATED_DELETE_DUTYRECURRENCE } from '../common/Messages';

@Route('DutyRecurrences')
@Security('jwt')
@AutoWired
export class DutyRecurrenceController extends ControllerBase<DutyRecurrence, DutyRecurrenceService> {

    @Inject
    protected serviceInstance!: DutyRecurrenceService;


    @Get()
    public getDutyRecurrences(@Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAllEffective({ startDate, endDate });
    }

    @Get('{id}')
    public getDutyRecurrenceById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createDutyRecurrence(@Body() model: DutyRecurrence) {
        return super.create(model);
    }

    @Put('{id}')
    public updateDutyRecurrence(@Path() id: string, @Body() model: DutyRecurrence) {
        return super.update(id, model);
    }

    @Post('{id}')
    public expireDutyRecurrence(@Path() id: string) {
        return this.service.expire(id);
    }


    /**
     *
     * @deprecated Please use expireDutyRecurrence instead
     * @param {string} id
     * @returns
     * @memberof DutyRecurrenceController
     */
    @Delete('{id}')
    public deleteDutyRecurrence(@Path() id: string, @Request() request: KoaRequest) {
        request.ctx.throw(410, ERROR_DEPRECATED_DELETE_DUTYRECURRENCE);
    }
}