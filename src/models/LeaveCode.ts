export interface LeaveCode {
    code?: string;
    subCode?: string;
    // name?: string;
    description?: string; // TODO: For future use
    effectiveDate?: string;
    expiryDate?: string;
    sortOrder?: number;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
