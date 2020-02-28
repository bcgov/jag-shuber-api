import { Sheriff } from './Sheriff';
import { UserRole } from './UserRole';

export interface User {
    id?: string; // GUID user_id
    siteminderId?: string;
    userAuthId?: string;
    displayName?: string; // Display name for the user
    defaultLocationId?: string; // GUID Set a default location for the user
    systemAccountInd?: number; // Is the user a system user
    sheriffId?: string; // If the user is a sheriff, this needs to be populated
    sheriff?: Sheriff;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
    userRoles?: UserRole[];
}
