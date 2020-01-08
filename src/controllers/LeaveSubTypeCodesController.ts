import { Get, Post, Put, Delete, Route, Path, Body, Request, Query } from 'tsoa';
import ControllerBase from '../infrastructure/ControllerBase';
import { LeaveSubCode } from '../models/LeaveSubCode';
import { LeaveSubCodeService } from '../services/LeaveSubCodeService';
import { Security } from '../authentication';
import { AutoWired, Inject } from 'typescript-ioc';
import { Request as KoaRequest } from 'koa';


@Route('codes/leave-sub-type')
@Security('jwt')
@AutoWired
export class LeaveSubTypeCodesController extends ControllerBase<LeaveSubCode, LeaveSubCodeService> {

    @Inject
    protected serviceInstance!: LeaveSubCodeService;

    @Get()
    public getLeaveSubCodes(@Query() startDate?: string, @Query() endDate?: string) {
        return this.service.getAll({ startDate, endDate });
    }

    @Get('{id}')
    public getLeaveSubCodeById(id: string) {
        return super.getById(id);
    }

    @Post()
    public createLeaveSubCode(@Body() model: LeaveSubCode) {
        return super.create(model);
    }

    @Put('{id}')
    public updateLeaveSubCode(@Path() id: string, @Body() model: LeaveSubCode) {
        return super.update(id, model);
    }

    @Post('{id}')
    public expireLeaveSubCode(@Path() id: string) {
        return this.service.expire(id);
    }

    
    /**
     * @deprecated Use expireLeaveSubCode Instead
     *
     * @param {string} id
     * @returns
     * @memberof LeaveSubCodeController
     */
    @Delete('{id}')
    public deleteLeaveSubCode(@Path() id: string, @Request() request: KoaRequest) {
        // request.ctx.throw(ERROR_DEPRECATED_DELETE_ASSIGNMENT,410);
    }
}