import { DutyRecurrence } from "./DutyRecurrence";

export interface Assignment {
    id?: string;
    title?: string;
    workSectionId: string;
    courthouseId: string;
    courtroomId?: string;
    runId?:string;
    jailRoleCode?:string;
    otherAssignCode?:string;
    // effectiveDate?:string;
    // expiryDate?:string;
    dutyRecurrences?:DutyRecurrence[]
}