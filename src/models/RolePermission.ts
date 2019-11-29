import { RoleApiScope } from './RoleApiScope';
import { RoleFrontendScope } from './RoleFrontendScope';


// It doesn't look like tsoa supports this:
// "Note that type aliases are only supported for string literal types like type status = 'Happy' | 'Sad'"
// type RoleScope = RoleApiScope | RoleFrontendScope;

/**
 * Scoped access to API routes.
 */
// TODO: What fields should be required?
export interface RolePermission {
    guid?: string;
    rolePermissionId?:string;
    roleId?:string;
    roleScopeString:string; // TODO: frontend | api ?
    // roleScope: RoleScope // TODO: frontend | api ?
    roleApiScope: RoleApiScope // TODO: frontend | api ?
    roleFrontendScope:RoleFrontendScope // TODO: frontend | api ?
    displayName?:string;
    description?:string;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
