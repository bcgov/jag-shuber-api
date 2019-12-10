import * as SA from 'superagent';
import Client from './Client';
import { Assignment, Location, Courtroom, Duty, DutyRecurrence, Region, EscortRun, Sheriff, Shift, DutyImportDefaultsRequest, MultipleShiftUpdateRequest, Leave, SheriffDuty, SheriffDutyAutoAssignRequest, User, Role, UserRole, ApiScope, RoleApiScope, FrontendScope, RoleFrontendScope, RolePermission } from './models';
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
    GetLocationById(id: string): Promise<Location>;
    GetSheriffById(id: string): Promise<Sheriff>;
    GetSheriffs(locationId?: string): Promise<Sheriff[]>;
    GetCourtroomById(id: string): Promise<Courtroom>;
    GetCourtrooms(locationId?: string): Promise<Courtroom[]>;
    GetAssignmentById(id: string): Promise<Assignment>;
    GetAssignments(locationId?: string, startDate?: DateType, endDate?: DateType): Promise<Assignment[]>;
    GetEscortRuns(locationId?: string): Promise<EscortRun[]>;
    GetEscortRunById(id: string): Promise<EscortRun>;
    GetShifts(locationId?: string): Promise<Shift[]>;
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
    GetUsers(): Promise<User[]>;
    GetUsersByLocationId(locationId?: string): Promise<User[]>;
    GetUserById(id: string): Promise<User>;
    GetRoles(): Promise<Role[]>;
    GetRoleById(id: string): Promise<Role>;
    GetUserRoleById(id: string): Promise<UserRole>;
    GetApiScopes(): Promise<ApiScope[]>;
    GetFrontendScopes(): Promise<FrontendScope[]>;
    GetRoleApiScopes(): Promise<RoleApiScope[]>;
    GetRoleFrontendScopes(): Promise<RoleFrontendScope[]>;
    GetRolePermissions(): Promise<RolePermission[]>;
}
