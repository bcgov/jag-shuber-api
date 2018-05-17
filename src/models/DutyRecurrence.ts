
export interface DutyRecurrence {
    id?: string;
    startTime: string;
    endTime: string;
    daysBitmap: number;
    sheriffsRequired: number;
    assignmentId?: string;
    // effectiveDate?:string;
    // expiryDate?:string;
}
