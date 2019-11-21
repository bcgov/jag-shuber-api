// TODO: What fields should be required?
export interface Role {
    guid?: string;
    roleId?:string;
    roleName?:string; // Human-friendly role name
    roleCode?:string; // Code type for the role
    systemCodeInd?: string; // Is the code type a SYSTEM code
    description?:string; // Role description
    createdBy?:string;
    updatedBy?:string;
    createdDtm?:string;
    updatedDtm?:string;
    revisionCount?:number;
}
