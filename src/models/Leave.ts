export interface Leave{
    id?:string;
    sheriffId:string;
    leaveCode: string;
    leaveSubCode: string;
    startDate:string;
    endDate?:string;
    startTime?: string; 
    endTime?: string;
    isPartial: number;
    comment?: string;
    cancelDate?:string;
    cancelReasonCode?:string;
}