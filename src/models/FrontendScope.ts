/**
 * Frontend scopes. Scopes in this context refer to application pages.
 * Scopes may contain permissions.
 */
export interface FrontendScope {
    guid?: string;
    frontendScopeId?:string;
    scopeName?:string; // Human-friendly scope name
    scopeCode?:string; // Code type for the scope
    systemScopeInd?: string; // Is the scope required by the SYSTEM
    description?:string; // Scope description
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
