import { ApiScope } from './ApiScope';
import { FrontendScope } from './FrontendScope';

export interface FrontendScopeApi {
    id?: string; // GUID
    frontendScopeId?: string; // GUID
    frontendScope?: FrontendScope;
    apiScopeId?: string; // GUID
    apiScope?: ApiScope;
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
