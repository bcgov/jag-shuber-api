export interface Assignment {
    id?: string;
    title: string;
    workSectionCode: string;
    courthouseId: string;
    courtroomId?: string;
    runId?:string;
    jailRoleCode?:string;
    otherAssignCode?:string;
    effectiveDate?:string;
    expiryDate?:string;
}