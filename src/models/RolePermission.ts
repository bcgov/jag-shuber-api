import { RoleApiScope } from './RoleApiScope';
import { RoleFrontendScope } from './RoleFrontendScope';

// It doesn't look like tsoa supports this: 
// "Note that type aliases are only supported for string literal types like type status = 'Happy' | 'Sad'"
// type RoleScope = RoleApiScope | RoleFrontendScope;

/**
 * Scoped permissions for API routes and frontend components.
 */
export interface RolePermission {
    id?: string; // GUID
    roleId?: string; // GUID
    // roleScope: RoleScope // TODO: frontend | api ?
    roleApiScopeId?: string; // GUID
    roleApiScope?: RoleApiScope // TODO: not sure if I need this...
    roleFrontendScopeId?: string; // GUID
    roleFrontendScope?: RoleFrontendScope // TODO: not sure if I need this...
    apiScopePermissionId?: string;
    frontendScopePermissionId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
