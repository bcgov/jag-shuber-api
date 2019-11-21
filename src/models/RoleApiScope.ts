/**
 * Scoped access to API routes.
 */
// TODO: What fields should be required?
export interface RoleApiScope {
    guid?: string;
    roleApiScopeId?:string;
    roleId?:string;
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
