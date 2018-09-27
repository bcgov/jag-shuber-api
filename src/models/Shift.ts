export interface Shift{
    id?:string;
    workSectionId?:string;
    locationId:string;
    sheriffId?:string;
    startDateTime:string;
    endDateTime:string;
    assignmentId?: string;
}