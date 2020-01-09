import { Sheriff } from './Sheriff';
import { UserRole } from './UserRole';

export interface User {
    id?:string; // GUID app_user_id
    siteminderId?:string;
    displayName?:string; // Display name for the user
    // type?:string; // This isn't in the database table TODO: deprecate?
    defaultLocationId?: string; // GUID Set a default location for the user
    systemAccountInd?: number; // Is the user a system user
    sheriffId?:string; // If the user is a sheriff, this needs to be populated
    sheriff?: Sheriff;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
    userRoles?: UserRole[];
}
