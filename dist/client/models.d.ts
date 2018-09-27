export interface DutyRecurrence {
    id?: string;
    startTime?: string;
    endTime?: string;
    daysBitmap?: number;
    sheriffsRequired?: number;
    assignmentId?: string;
}
export interface Assignment {
    id?: string;
    title?: string;
    workSectionId?: string;
    locationId?: string;
    courtroomId?: string;
    courtRoleId?: string;
    escortRunId?: string;
    jailRoleCode?: string;
    otherAssignCode?: string;
    dutyRecurrences?: Array<DutyRecurrence>;
}
export interface Region {
    id?: string;
    code?: string;
    name?: string;
    location?: any;
}
export interface Location {
    id?: string;
    code?: string;
    name?: string;
    parentLocationId?: string;
    regionId?: string;
}
export interface Sheriff {
    id?: string;
    firstName?: string;
    lastName?: string;
    badgeNo?: string;
    imageUrl?: string;
    homeLocationId?: string;
    currentLocationId?: string;
    rankCode?: string;
    alias?: string;
    genderCode?: string;
}
export interface Courtroom {
    id?: string;
    code?: string;
    name?: string;
    locationId?: string;
}
export interface JailRoleCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface OtherAssignCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface WorkSectionCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface SheriffRankCode {
    code?: string;
    description?: string;
    expiryDate?: string;
    order?: number;
}
export interface EscortRun {
    id?: string;
    title?: string;
    locationId?: string;
}
export interface Shift {
    id?: string;
    workSectionId?: string;
    locationId?: string;
    sheriffId?: string;
    startDateTime?: string;
    endDateTime?: string;
    assignmentId?: string;
}
export interface MultipleShiftUpdateRequest {
    shiftIds?: Array<string>;
    sheriffId?: string;
    startTime?: string;
    endTime?: string;
    workSectionId?: string;
    assignmentId?: string;
}
export interface ShiftCopyOptions {
    shouldIncludeSheriffs?: boolean;
    startOfWeekSource?: string;
    startOfWeekDestination?: string;
    locationId?: string;
}
export interface SheriffDuty {
    id?: string;
    sheriffId?: string;
    dutyId?: string;
    startDateTime?: string;
    endDateTime?: string;
}
export interface Duty {
    id?: string;
    startDateTime?: string;
    endDateTime?: string;
    assignmentId?: string;
    dutyRecurrenceId?: string;
    sheriffDuties?: Array<SheriffDuty>;
    comments?: string;
}
export interface DutyImportDefaultsRequest {
    locationId?: string;
    date?: string;
}
export interface SheriffDutyAutoAssignRequest {
    locationId?: string;
    date?: string;
}
export interface Leave {
    id?: string;
    sheriffId?: string;
    leaveCode?: string;
    leaveSubCode?: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    isPartial?: number;
    comment?: string;
    cancelDate?: string;
    cancelReasonCode?: string;
}
export interface LeaveCancelReasonCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface LeaveCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface LeaveSubCode {
    code?: string;
    subCode?: string;
    description?: string;
    expiryDate?: string;
}
export interface CourtRoleCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface GenderCode {
    code?: string;
    description?: string;
    expiryDate?: string;
}
export interface User {
    guid?: string;
    displayName?: string;
    userId?: string;
    type?: string;
}
