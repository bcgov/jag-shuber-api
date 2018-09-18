export interface MultipleShiftUpdateRequest {
    shiftIds: string[]
    sheriffId?: string; 
    startTime?: string;
    endTime?: string;
    workSectionId?: string;
    assignmentId?: string;
}