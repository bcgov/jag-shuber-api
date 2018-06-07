export interface Leave{
    id?:string;
    sheriffId:string;
    startDate:string;
    endDate:string;
    leaveType:string;
    cancelDate?:string;
    cancelReason?:string;
}