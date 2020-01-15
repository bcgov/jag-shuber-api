/**
 * Scoped permissions for API routes and frontend components.
 */
export interface FrontendScopePermission {
    id?:string; // GUID
    frontendScopeId?:string;
    frontendScopeCode?:string; // Only used when generating scopes
    permissionCode?:string;
    displayName?:string;
    description?:string;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
