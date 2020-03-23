export interface LeaveSubCode {
    code: string;
    subCode: string;
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
