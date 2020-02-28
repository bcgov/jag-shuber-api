import { ApiScope } from './ApiScope';

/**
 * Scoped access to API routes.
 */
export interface RoleApiScope {
    id?: string; // GUID role_api_scope_id
    roleId?: string; // GUID
    scopeId?: string; // GUID
    scope?: ApiScope;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
