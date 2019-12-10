/**
 * API scopes. Scopes in this context refer to top-level routes.
 */
export interface ApiScope {
    id?: string; // GUID api_scope_id
    scopeName?:string; // Human-friendly scope name
    scopeCode?:string; // Code type for the scope
    systemCodeInd?: boolean; // Is the scope required by the SYSTEM
    description?:string; // Scope description
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
