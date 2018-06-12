import { SheriffDuty } from "./SheriffDuty";

export interface Duty {
    id?: string;
    startDateTime: string;
    endDateTime: string;
    assignmentId: string;
    dutyRecurrenceId?: string;
    sheriffDuties?: SheriffDuty[];
    comments?: string;
}