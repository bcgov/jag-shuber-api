import { RolePermission } from './RolePermission'

/**
 * Scoped access to API routes.
 */
export interface RoleApiScope {
    id?:string; // GUID app_role_api_scope_id
    roleId?:string; // GUID
    scopeId?:string; // GUID
    rolePermissions:Array<RolePermission | undefined>;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
