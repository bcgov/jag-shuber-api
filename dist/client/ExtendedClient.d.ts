import * as SA from 'superagent';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift, DutyImportDefaultsRequest, MultipleShiftUpdateRequest, Leave, SheriffDuty, SheriffDutyAutoAssignRequest } from './models';
import { DateType } from '../common/types';
export declare type SuperAgentRequestInterceptor = (req: SA.SuperAgentRequest) => SA.SuperAgentRequest;
export default class ExtendedClient extends Client {
    private _requestInterceptor?;
    private timezoneOffset?;
    constructor(baseUrl: string);
    private interceptRequest;
    requestInterceptor: SuperAgentRequestInterceptor | undefined;
    protected handleResponse<T>(response: SA.Response): T;
    protected ensureToken(): Promise<void>;
    protected processError(err: any): Error;
    private nullOn404;
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
    GetLeaveById(id: string): Promise<Leave>;
    GetSheriffDutyById(id: string): Promise<Duty>;
    private ensureTimeZone;
    CreateDutyRecurrence(model: DutyRecurrence): Promise<DutyRecurrence>;
    UpdateDutyRecurrence(id: string, model: DutyRecurrence): Promise<DutyRecurrence>;
    CreateAssignment(model: Assignment): Promise<Assignment>;
    UpdateAssignment(id: string, model: Assignment): Promise<Assignment>;
    private ensureLeaveTimes;
    CreateLeave(model: Leave): Promise<Leave>;
    UpdateLeave(id: string, model: Leave): Promise<Leave>;
    UpdateMultipleShifts(model: MultipleShiftUpdateRequest): Promise<Shift[]>;
    ImportDefaultDuties(request: DutyImportDefaultsRequest): Promise<Duty[]>;
    AutoAssignSheriffDuties(request: SheriffDutyAutoAssignRequest): Promise<SheriffDuty[]>;
    /**
     * @deprecated Please use ExpireAssignment instead.
     */
    DeleteAssignment(id: string): Promise<void>;
    /**
     * @deprecated Please use ExpireDutyRecurrence instead.
     */
    DeleteDutyRecurrence(id: string): Promise<void>;
}
