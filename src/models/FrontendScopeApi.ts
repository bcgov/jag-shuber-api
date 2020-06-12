import { ApiScope } from './ApiScope';
import { FrontendScope } from './FrontendScope';

export interface FrontendScopeApi {
    id?: string; // GUID
    frontendScopeId?: string; // GUID
    frontendScope?: FrontendScope;
    frontendScopeCode?: string;  // Only used when generating scopes
    apiScopeId?: string; // GUID
    apiScope?: ApiScope;
    apiScopeCode?: string;  // Only used when generating scopes
    createdBy?: string;
    updatedBy?: string;
    createdDtm?: string;
    updatedDtm?: string;
    revisionCount?: number;
}
