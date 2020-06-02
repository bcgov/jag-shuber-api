import { DutyRecurrence } from "./DutyRecurrence";

export interface Assignment {
    id?: string;
    title?: string;
    workSectionId: string;
    locationId: string;
    courtroomId?: string;
    courtRoleId?: string;
    jailRoleId?: string;
    escortRunId?: string;
    otherAssignId?: string;
    courtRoleCode?: string; // Deprecated
    jailRoleCode?: string; // Deprecated
    otherAssignCode?: string; // Deprecated
    dutyRecurrences?: DutyRecurrence[]
    startDateTime?: string,
    endDateTime?: string,
}
