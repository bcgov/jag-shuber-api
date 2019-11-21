/**
 * API scopes. Scopes in this context refer to top-level routes.
 */
// TODO: What fields should be required?
export interface ApiScope {
    guid?: string;
    apiScopeId?:string;
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
