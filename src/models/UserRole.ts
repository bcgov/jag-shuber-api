import { Role } from './Role';

export interface UserRole {
    id?: string; // GUID user_role_id
    userId?: string; // GUID
    roleId?: string; // GUID
    role?: Role;
    effectiveDate?: string; // See expiryDate...
    expiryDate?: string; // Roles don't inherently expire, but a user's role assignment can
    locationId?: string; // GUID If defined, the user role is only valid for a particular location
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
