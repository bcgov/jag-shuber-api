// TODO: What fields should be required?
export interface User {
    guid?: string;
    userId?:string;
    displayName?:string; // Display name for the user
    type?:string; // This isn't in the database table TODO: deprecate?
    defaultLocationId?: string; // Set a default location for the user
    systemAccountInd?: string; // Is the user a system user
    sheriffId?:string; // If the user is a sheriff, this needs to be populated
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
