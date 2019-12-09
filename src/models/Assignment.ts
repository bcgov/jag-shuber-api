import { DutyRecurrence } from "./DutyRecurrence";

export interface Assignment {
    id?: string;
    title?: string;
    workSectionId: string;
    locationId: string;
    courtroomId?: string;
    courtRoleId?: string;
    escortRunId?:string;
    jailRoleCode?:string;
    otherAssignCode?:string;
    dutyRecurrences?:DutyRecurrence[]
    startDateTime?: string,
    endDateTime?: string,
}