import { RoleApiScope } from './RoleApiScope';
import { RoleFrontendScope } from './RoleFrontendScope';

type RoleScope = RoleApiScope | RoleFrontendScope;

/**
 * Scoped access to API routes.
 */
// TODO: What fields should be required?
export interface RolePermission {
    guid?: string;
    rolePermissionId?:string;
    roleId?:string;
    roleScopeString:string; // TODO: frontend | api ?
    roleScope:RoleScope // TODO: frontend | api ?
    displayName?:string;
    description?:string;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
