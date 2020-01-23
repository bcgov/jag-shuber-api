import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist. See authentication.ts, located in the same
 * folder and add each ApiScope.scopeCode value to the Scopes interface to link an application route's security scope
 * to an ApiScope that can be assigned to system users using the frontend application's user interface.
 */
export declare const defaultApiScopes: ApiScope[];
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export declare const defaultFrontendScopes: FrontendScope[];
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export declare const defaultFrontendScopePermissions: FrontendScopePermission[];
/**
 * IMPORTANT! DO NOT REMOVE! This is the default SYSTEM role.
 */
export declare const defaultRoles: {
    roleName: string;
    roleCode: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    createdDtm: string;
    updatedDtm: string;
    revisionCount: number;
}[];
/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export declare const defaultSystemFrontendScopes: {
    roleCode: string;
    scopeCode: string;
    createdBy: string;
    updatedBy: string;
    createdDtm: string;
    updatedDtm: string;
    revisionCount: number;
}[];
/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export declare const defaultSystemApiScopes: {
    roleCode: string;
    scopeCode: string;
    createdBy: string;
    updatedBy: string;
    createdDtm: string;
    updatedDtm: string;
    revisionCount: number;
}[];
