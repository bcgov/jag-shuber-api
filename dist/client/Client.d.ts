import * as superAgent from "superagent";
import { TypedEvent } from '../common/TypedEvent';
import { Assignment, Region, Location, Sheriff, Courtroom, JailRoleCode, OtherAssignCode, WorkSectionCode, SheriffRankCode, EscortRun, Shift, MultipleShiftUpdateRequest, ShiftCopyOptions, DutyRecurrence, Duty, DutyImportDefaultsRequest, SheriffDuty, SheriffDutyAutoAssignRequest, Leave, LeaveCancelReasonCode, LeaveCode, LeaveSubCode, CourtRoleCode, GenderCode, User, UserRole, Role, RolePermission, ApiScope, FrontendScope, RoleApiScope, RoleFrontendScope } from "./models";
export default class Client {
    private _agent;
    private _previousToken;
    private _tokenChangedEvent;
    /**
     * An event that is fired when the app token associated with this client
     * has changed.
     *
     * @readonly
     * @type {TypedEvent<string|undefined>}
     * @memberof Client
     */
    readonly onTokenChanged: TypedEvent<string | undefined>;
    /**
     * A hook to allow errors occured to be processed further before being thrown
     * out of the api client. This is useful for modifying validation errors etc.
     *
     * @memberof Client
     */
    errorProcessor: (error: any) => Error;
    constructor(_agent?: superAgent.SuperAgent<any>);
    /**
     * Returns the underlying SuperAgent instance being used for requests
     *
     * @readonly
     * @memberof Client
     */
    readonly agent: superAgent.SuperAgent<any>;
    /**
     * Hook responsible for extracting the value out of the response
     *
     * @protected
     * @template T
     * @param {superAgent.Response} response
     * @returns {T}
     * @memberof Client
     */
    protected handleResponse<T>(response: superAgent.Response): T;
    /**
     * Ensures that a application token currently exists and fetches a new one
     * if the old one has expired or is not present.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof Client
     */
    protected ensureToken(): Promise<void>;
    /**
     * Takes a token and handles emitting events if the token has changed
     *
     * @protected
     * @param {string} [tokenString]
     * @memberof Client
     */
    protected handleNewToken(token?: string): void;
    /**
     * All operations in the client are routed through this method which
     * is responsible for issuing and handling responses in a way which
     * errors can be captured and processed within the client.
     * This method also ensures that a client token exists before issuing the
     * request.
     *
     * @protected
     * @template T
     * @param {() => Promise<superAgent.Response>} worker
     * @returns {Promise<T>}
     * @memberof Client
     */
    protected tryRequest<T>(worker: () => Promise<superAgent.Response>): Promise<T>;
    GetAssignments(locationId: string, startDate: string, endDate: string): Promise<Array<Assignment>>;
    CreateAssignment(model: Assignment): Promise<Assignment>;
    GetAssignmentById(id: string): Promise<Assignment>;
    UpdateAssignment(id: string, model: Assignment): Promise<Assignment>;
    ExpireAssignment(id: string): Promise<void>;
    DeleteAssignment(id: string): Promise<void>;
    GetRegions(): Promise<Array<Region>>;
    CreateRegion(model: Region): Promise<Region>;
    GetRegionById(id: string): Promise<Region>;
    UpdateRegion(id: string, model: Region): Promise<Region>;
    DeleteRegion(id: string): Promise<void>;
    GetLocations(): Promise<Array<Location>>;
    CreateLocation(model: Location): Promise<Location>;
    GetLocationById(id: string): Promise<Location>;
    UpdateLocation(id: string, model: Location): Promise<Location>;
    DeleteLocation(id: string): Promise<void>;
    GetSheriffs(locationId: string): Promise<Array<Sheriff>>;
    CreateSheriff(model: Sheriff): Promise<Sheriff>;
    GetSheriffById(id: string): Promise<Sheriff>;
    UpdateSheriff(id: string, model: Sheriff): Promise<Sheriff>;
    DeleteSheriff(id: string): Promise<void>;
    GetCourtrooms(locationId: string): Promise<Array<Courtroom>>;
    CreateCourtroom(model: Courtroom): Promise<Courtroom>;
    GetCourtroomById(id: string): Promise<Courtroom>;
    UpdateCourtroom(id: string, model: Courtroom): Promise<Courtroom>;
    DeleteCourtroom(id: string): Promise<void>;
    GetJailRoleCodes(): Promise<Array<JailRoleCode>>;
    GetOtherAssignCodes(): Promise<Array<OtherAssignCode>>;
    GetWorkSectionCodes(): Promise<Array<WorkSectionCode>>;
    GetSheriffRankCodes(): Promise<Array<SheriffRankCode>>;
    GetEscortRuns(locationId: string): Promise<Array<EscortRun>>;
    CreateEscortRun(model: EscortRun): Promise<EscortRun>;
    GetEscortRunById(id: string): Promise<EscortRun>;
    UpdateEscortRun(id: string, model: EscortRun): Promise<EscortRun>;
    DeleteEscortRun(id: string): Promise<void>;
    GetShifts(locationId: string): Promise<Array<Shift>>;
    CreateShift(model: Shift): Promise<Shift>;
    GetShiftById(id: string): Promise<Shift>;
    UpdateShift(id: string, model: Shift): Promise<Shift>;
    DeleteShift(id: string): Promise<void>;
    UpdateMultipleShifts(model: MultipleShiftUpdateRequest): Promise<Array<Shift>>;
    CopyShifts(model: ShiftCopyOptions): Promise<Array<Shift>>;
    GetDutyRecurrences(startDate: string, endDate: string): Promise<Array<DutyRecurrence>>;
    CreateDutyRecurrence(model: DutyRecurrence): Promise<DutyRecurrence>;
    GetDutyRecurrenceById(id: string): Promise<DutyRecurrence>;
    UpdateDutyRecurrence(id: string, model: DutyRecurrence): Promise<DutyRecurrence>;
    ExpireDutyRecurrence(id: string): Promise<void>;
    DeleteDutyRecurrence(id: string): Promise<void>;
    GetDuties(locationId: string, startDate: string, endDate: string): Promise<Array<any>>;
    CreateDuty(model: Duty): Promise<Duty>;
    GetDutyById(id: string): Promise<Duty>;
    UpdateDuty(id: string, model: Duty): Promise<Duty>;
    DeleteDuty(id: string): Promise<void>;
    ImportDefaultDuties(body: DutyImportDefaultsRequest): Promise<Array<Duty>>;
    GetSheriffDuties(): Promise<Array<SheriffDuty>>;
    CreateSheriffDuty(model: SheriffDuty): Promise<SheriffDuty>;
    GetSheriffDutyById(id: string): Promise<SheriffDuty>;
    UpdateSheriffDuty(id: string, model: SheriffDuty): Promise<SheriffDuty>;
    DeleteSheriffDuty(id: string): Promise<void>;
    AutoAssignSheriffDuties(model: SheriffDutyAutoAssignRequest): Promise<Array<SheriffDuty>>;
    GetLeaves(): Promise<Array<Leave>>;
    CreateLeave(model: Leave): Promise<Leave>;
    GetLeaveById(id: string): Promise<Leave>;
    UpdateLeave(id: string, model: Leave): Promise<Leave>;
    DeleteLeave(id: string): Promise<void>;
    GetLeaveCancelReasonCodes(): Promise<Array<LeaveCancelReasonCode>>;
    GetLeaveTypes(): Promise<Array<LeaveCode>>;
    GetLeaveSubCodes(): Promise<Array<LeaveSubCode>>;
    GetCourtRoleCodes(): Promise<Array<CourtRoleCode>>;
    GetGenderCodes(): Promise<Array<GenderCode>>;
    GetToken(): Promise<any>;
    Logout(): Promise<any>;
    GetCurrentUser(): Promise<User>;
    GetUsers(): Promise<Array<any>>;
    CreateUser(model: User): Promise<any>;
    GetUserById(id: string): Promise<any>;
    UpdateUser(id: string, model: User): Promise<any>;
    DeleteUser(id: string): Promise<void>;
    GetCurrentUserRoles(): Promise<Array<any>>;
    GetUserRoles(): Promise<Array<any>>;
    CreateUserRole(model: UserRole): Promise<any>;
    GetUserRoleById(id: string): Promise<any>;
    UpdateUserRole(id: string, model: UserRole): Promise<any>;
    DeleteUserRole(id: string): Promise<void>;
    ExpireUserRole(id: string, model: UserRole): Promise<any>;
    GetRoles(): Promise<Array<any>>;
    CreateRole(model: Role): Promise<any>;
    GetRoleById(id: string): Promise<any>;
    UpdateRole(id: string, model: Role): Promise<any>;
    DeleteRole(id: string): Promise<void>;
    GetRolePermissions(): Promise<Array<any>>;
    CreateRolePermission(model: RolePermission): Promise<any>;
    GetRolePermissionById(id: string): Promise<any>;
    UpdateRolePermission(id: string, model: RolePermission): Promise<any>;
    DeleteRolePermission(id: string): Promise<void>;
    GetApiScopes(): Promise<Array<any>>;
    CreateApiScope(model: ApiScope): Promise<any>;
    GetApiScopeById(id: string): Promise<any>;
    UpdateApiScope(id: string, model: ApiScope): Promise<any>;
    DeleteApiScope(id: string): Promise<void>;
    GetFrontendScopes(): Promise<Array<any>>;
    CreateFrontendScope(model: FrontendScope): Promise<any>;
    GetFrontendScopeById(id: string): Promise<any>;
    UpdateFrontendScope(id: string, model: FrontendScope): Promise<any>;
    DeleteFrontendScope(id: string): Promise<void>;
    GetRoleApiScopes(): Promise<Array<any>>;
    CreateRoleApiScope(model: RoleApiScope): Promise<any>;
    GetRoleApiScopeById(id: string): Promise<any>;
    UpdateRoleApiScope(id: string, model: RoleApiScope): Promise<any>;
    DeleteRoleApiScope(id: string): Promise<void>;
    GetRoleFrontendScopes(): Promise<Array<any>>;
    CreateRoleFrontendScope(model: RoleFrontendScope): Promise<any>;
    GetRoleFrontendScopeById(id: string): Promise<any>;
    UpdateRoleFrontendScope(id: string, model: RoleFrontendScope): Promise<any>;
    DeleteRoleFrontendScope(id: string): Promise<void>;
}
