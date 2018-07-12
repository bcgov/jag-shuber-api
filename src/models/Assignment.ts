import { DutyRecurrence } from "./DutyRecurrence";

export interface Assignment {
    id?: string;
    title?: string;
    workSectionId: string;
    courthouseId: string;
    courtroomId?: string;
    courtRoleId?: string;
    runId?:string;
    jailRoleCode?:string;
    otherAssignCode?:string;
    dutyRecurrences?:DutyRecurrence[]
}