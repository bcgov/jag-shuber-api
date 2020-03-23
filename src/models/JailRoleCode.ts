export interface JailRoleCode {
    id?: string;
    locationId?: string;
    code?: string;
    name?: string;
    description?: string; // TODO: For future use
    effectiveDate?: string;
    expiryDate?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
