export interface DatabaseRecordMetadata {
    createdBy?: string;
    updatedBy?: string;
    createdDate?: string;
    updatedDate?: string;
}

export const DatabaseMetadataFieldMap = {
    created_by: 'createdBy',
    updated_by: 'updatedBy',
    created_dtm: 'createdDate',
    updated_dtm: 'updatedDate'
}