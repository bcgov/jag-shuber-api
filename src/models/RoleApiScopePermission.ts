import { RolePermission } from './RolePermission';
import { RoleApiScope } from './RoleApiScope';
import { ApiScope } from './ApiScope';

export interface RoleApiScopePermission extends RolePermission {
    scope?: ApiScope;
    roleScope?: RoleApiScope;
    hasPermission?: boolean;
}
