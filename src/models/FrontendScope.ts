/**
 * Frontend scopes. Scopes in this context refer to application pages.
 * Scopes may contain permissions.
 */
export interface FrontendScope {
    id?: string; // GUID frontend_scope_id
    scopeName?:string; // Human-friendly scope name
    scopeCode?:string; // Code type for the scope
    systemCodeInd?: number; // Is the scope required by the SYSTEM
    description?:string; // Scope description
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
