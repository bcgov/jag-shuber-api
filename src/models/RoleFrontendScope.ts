import { RolePermission } from './RolePermission'

/**
 * Scoped permissions for the frontend application.
 * This could be re-implemented in a modular fashion if necessary,
 * but seeing as there is only one consumer of this API, it's overkill
 * for our current needs.
 */
export interface RoleFrontendScope {
    id?:string; // GUID app_role_frontend_scope_id
    roleId?:string; // GUID
    scopeId?:string; // GUID
    // rolePermissions?:Array<RolePermission | undefined>;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
