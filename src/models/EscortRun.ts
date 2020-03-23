export interface EscortRun {
    id?: string;
    locationId?: string;
    title: string; // TODO: We want to deprecate this
    code?: string; // TODO: For future use
    name?: string; // TODO: For future use
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
