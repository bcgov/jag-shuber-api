import moment, { Moment, isMoment } from 'moment';
import * as SA from 'superagent';
import saPrefix from 'superagent-prefix';
import superagentUse from 'superagent-use';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift, DutyImportDefaultsRequest, MultipleShiftUpdateRequest } from './models';
import { toTimeString } from '../common/TimeUtils';
import { ValidationError, DatabaseError, ApiError, isDatabaseError, isValidationError } from '../common/Errors';

export type DateType = string | Date | moment.Moment | number;

export type SuperAgentRequestInterceptor = (req: SA.SuperAgentRequest) => SA.SuperAgentRequest

export default class ExtendedClient extends Client {

    private _requestInterceptor?: SuperAgentRequestInterceptor;
    private timezoneOffset?: number;

    constructor(baseUrl: string) {
        super(
            superagentUse(SA.agent())
                .use(saPrefix(baseUrl))
        );
        (this.agent as any).use((req) => this.interceptRequest(req))
        this.errorProcessor = this.processError;
        this.timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    }

    private interceptRequest(req: SA.SuperAgentRequest) {
        req.set('Accept', 'application/javascript');
        req.set('TZ-Offset', `${this.timezoneOffset}`)
        return this._requestInterceptor ? this._requestInterceptor(req) : req;
    }

    set requestInterceptor(interceptor: SuperAgentRequestInterceptor) {
        this._requestInterceptor = interceptor;
    }

    protected processError(err) : Error {
        let apiError = new ApiError(err);
        return apiError;
    }

    private async nullOn404<T>(method: () => Promise<T>): Promise<T> {
        try {
            return await method();
        } catch (err) {
            if (err.status === 404) {
                return undefined as any;
            } else {
                throw err;
            }
        }
    }

    async GetRegionById(id: string): Promise<Region> {
        return await this.nullOn404(() => super.GetRegionById(id));
    }

    async GetCourthouseById(id: string): Promise<Courthouse> {
        return await this.nullOn404(
            () => super.GetCourthouseById(id)
        );
    }

    async GetSheriffById(id: string): Promise<Sheriff> {
        return await this.nullOn404(
            () => super.GetSheriffById(id)
        );
    }
    GetSheriffs(courthouseId: string = ""): Promise<Sheriff[]> {
        return super.GetSheriffs(courthouseId);
    }


    async GetCourtroomById(id: string): Promise<Courtroom> {
        return await this.nullOn404(
            () => super.GetCourtroomById(id)
        );
    }

    GetCourtrooms(courthouseId: string = ""): Promise<Courtroom[]> {
        return super.GetCourtrooms(courthouseId);
    }


    async GetAssignmentById(id: string): Promise<Assignment> {
        return await this.nullOn404(
            () => super.GetAssignmentById(id)
        );
    }

    GetAssignments(courthouseId: string = "", startDate?: DateType, endDate?: DateType): Promise<Assignment[]> {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetAssignments(courthouseId, startMoment.toISOString(), endMoment.toISOString());
    }

    GetRuns(courthouseId: string = ""): Promise<Run[]> {
        return super.GetRuns(courthouseId);
    }

    async GetRunById(id: string): Promise<Run> {
        return await this.nullOn404(
            () => super.GetRunById(id)
        );
    }

    GetShifts(courthouseId: string = ""): Promise<Shift[]> {
        return super.GetShifts(courthouseId);
    }

    async GetShiftById(id: string): Promise<Shift> {
        return await this.nullOn404(
            () => super.GetShiftById(id)
        );
    }

    async GetDutyRecurrenceById(id: string): Promise<DutyRecurrence> {
        return await this.nullOn404(
            () => super.GetDutyRecurrenceById(id)
        );
    }

    GetDutyRecurrences(startDate?: DateType, endDate?: DateType): Promise<DutyRecurrence[]> {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetDutyRecurrences(startMoment.toISOString(), endMoment.toISOString());
    }

    async GetDutyById(id: string): Promise<Duty> {
        return await this.nullOn404(
            () => super.GetDutyById(id)
        );
    }

    async GetSheriffDutyById(id: string): Promise<Duty> {
        return await this.nullOn404(
            () => super.GetSheriffDutyById(id)
        );
    }

    private ensureTimeZone(...dutyRecurrences: DutyRecurrence[]) {
        return dutyRecurrences.map(dr => ({
            ...dr,
            startTime: toTimeString(dr.startTime),
            endTime: toTimeString(dr.endTime)
        }));
    }

    CreateDutyRecurrence(model: DutyRecurrence) {
        return super.CreateDutyRecurrence(this.ensureTimeZone(model)[0]);
    }

    UpdateDutyRecurrence(id: string, model: DutyRecurrence) {
        return super.UpdateDutyRecurrence(id, this.ensureTimeZone(model)[0])
    }

    CreateAssignment(model: Assignment) {
        const { dutyRecurrences = [] } = model;
        return super.CreateAssignment({
            ...model,
            dutyRecurrences: this.ensureTimeZone(...dutyRecurrences)
        });
    }

    UpdateAssignment(id: string, model: Assignment) {
        const { dutyRecurrences = [] } = model;
        return super.UpdateAssignment(id, {
            ...model,
            dutyRecurrences: this.ensureTimeZone(...dutyRecurrences)
        });
    }

    UpdateMultipleShifts(model: MultipleShiftUpdateRequest) {
        const { startTime, endTime, ...rest } = model;
        const request: MultipleShiftUpdateRequest = {
            ...rest,
            startTime: startTime ? moment(startTime).format() : undefined,
            endTime: endTime ? moment(endTime).format() : undefined
        };

        return super.UpdateMultipleShifts(request);
    }

    async ImportDefaultDuties(request: DutyImportDefaultsRequest) {
        const {
            courthouseId,
            date
        } = request;

        const dateMoment = date ? moment(date) : moment().startOf('day');
        return await super.ImportDefaultDuties({ courthouseId, date: dateMoment.format("YYYY-MM-DD") });
    }
}