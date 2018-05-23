import moment from 'moment';
import * as SA from 'superagent';
import saPrefix from 'superagent-prefix';
import superagentUse from 'superagent-use';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift, DutyImportDefaultsRequest } from './models';

export type DateType = string | Date | moment.Moment | number;

export interface ValidationError {
    response: {
        body: {
            fields: {
                [key: string]: {
                    message: string,
                    value: any
                }
            };
        }
    }
    message: string;
}


export type SuperAgentRequestInterceptor = (req: SA.SuperAgentRequest) => SA.SuperAgentRequest

export default class ExtendedClient extends Client {

    private _requestInterceptor?: SuperAgentRequestInterceptor;

    constructor(baseUrl: string) {
        super(
            superagentUse(SA.agent())
                .use(saPrefix(baseUrl))
        );
        (this.agent as any).use((req) => this.interceptRequest(req))
        this.errorProcessor = this.processError;
    }

    private interceptRequest(req: SA.SuperAgentRequest) {
        return this._requestInterceptor ? this._requestInterceptor(req) : req;
    }

    set requestInterceptor(interceptor: SuperAgentRequestInterceptor) {
        this._requestInterceptor = interceptor;
    }

    static isValidationError(err: any): err is ValidationError {
        const { response: { body: { name = "" } = {} } = {} } = err;
        return name === "ValidateError";
    }

    protected processError(err) {
        if (ExtendedClient.isValidationError(err)) {
            let message = ["Validation Error"];
            const fields = err.response!.body!.fields || {};
            message.push(...Object.keys(fields).map(k => `${k}: "${fields[k].message}"`));
            const newMessage = message.join(' | ');
            err.message = newMessage;
        } else if (err!.response!.body!.message) {
            err.message = err!.response!.body!.message;
        }
        return err;
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

    async ImportDefaultDuties(request: DutyImportDefaultsRequest) {
        const {
            courthouseId,
            date = moment().toISOString()
        } = request;
        return await super.ImportDefaultDuties({ courthouseId, date });
    }
}