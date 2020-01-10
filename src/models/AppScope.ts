import { RolePermission } from './RolePermission';
import { RoleFrontendScope } from './RoleFrontendScope';
import { FrontendScope } from './FrontendScope';
import { FrontendScopePermission } from './FrontendScopePermission';

/**
 * DTO for permissions that gets attached to the user token.
 */
export interface AppScopePermission {
    permissionCode: string;
    hasPermission: boolean;
}
