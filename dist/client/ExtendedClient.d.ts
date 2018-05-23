/// <reference types="superagent" />
import moment from 'moment';
import * as SA from 'superagent';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift, DutyImportDefaultsRequest } from './models';
export declare type DateType = string | Date | moment.Moment | number;
export interface ValidationError {
    response: {
        body: {
            fields: {
                [key: string]: {
                    message: string;
                    value: any;
                };
            };
        };
    };
    message: string;
}
export declare type SuperAgentRequestInterceptor = (req: SA.SuperAgentRequest) => SA.SuperAgentRequest;
export default class ExtendedClient extends Client {
    private _requestInterceptor?;
    constructor(baseUrl: string);
    private interceptRequest(req);
    requestInterceptor: SuperAgentRequestInterceptor;
    static isValidationError(err: any): err is ValidationError;
    protected processError(err: any): any;
    private nullOn404<T>(method);
    GetRegionById(id: string): Promise<Region>;
    GetCourthouseById(id: string): Promise<Courthouse>;
    GetSheriffById(id: string): Promise<Sheriff>;
    GetSheriffs(courthouseId?: string): Promise<Sheriff[]>;
    GetCourtroomById(id: string): Promise<Courtroom>;
    GetCourtrooms(courthouseId?: string): Promise<Courtroom[]>;
    GetAssignmentById(id: string): Promise<Assignment>;
    GetAssignments(courthouseId?: string, startDate?: DateType, endDate?: DateType): Promise<Assignment[]>;
    GetRuns(courthouseId?: string): Promise<Run[]>;
    GetRunById(id: string): Promise<Run>;
    GetShifts(courthouseId?: string): Promise<Shift[]>;
    GetShiftById(id: string): Promise<Shift>;
    GetDutyRecurrenceById(id: string): Promise<DutyRecurrence>;
    GetDutyRecurrences(startDate?: DateType, endDate?: DateType): Promise<DutyRecurrence[]>;
    GetDutyById(id: string): Promise<Duty>;
    GetSheriffDutyById(id: string): Promise<Duty>;
    ImportDefaultDuties(request: DutyImportDefaultsRequest): Promise<Duty[]>;
}
