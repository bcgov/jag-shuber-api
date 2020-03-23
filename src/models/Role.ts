import { RoleFrontendScope } from './RoleFrontendScope';
import { RoleApiScope } from './RoleApiScope';

export interface Role {
    id?: string; // GUID app_role_id
    roleName?: string; // Human-friendly role name
    roleCode?: string; // Code type for the role // TODO: Not implemented
    systemCodeInd?: number; // Is the code type a SYSTEM code // TODO: Not implemented
    description?: string; // Role description
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
    roleFrontendScopes?: RoleFrontendScope[];
    roleApiScopes?: RoleApiScope[];
}
