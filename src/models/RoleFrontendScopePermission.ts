import { RolePermission } from './RolePermission';
import { RoleFrontendScope } from './RoleFrontendScope';
import { FrontendScope } from './FrontendScope';
import { FrontendScopePermission } from './FrontendScopePermission';

export interface RoleFrontendScopePermission extends RolePermission {
    scope?: FrontendScope;
    roleScope?: RoleFrontendScope;
    scopePermission?: FrontendScopePermission;
    hasPermission?: boolean;
}
