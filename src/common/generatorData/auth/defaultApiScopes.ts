import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { ApiScope } from '../../../models/ApiScope';

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist. See authentication.ts, located in the same
 * folder and add each ApiScope.scopeCode value to the Scopes interface to link an application route's security scope
 * to an ApiScope that can be assigned to system users using the frontend application's user interface.
 */
export const defaultApiScopes: ApiScope[] = [
    {
        scopeName: 'Manage Users', // Human-friendly scope name
        scopeCode: 'users:manage', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Manage Users and User Roles', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage Roles', // Human-friendly scope name
        scopeCode: 'roles:manage', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Manage Users and User Roles', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:manage', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Create, Update and Deactivate Sheriffs', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Update Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:update', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Update Sheriff Profile, Leaves and Training', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage System Scopes', // Human-friendly scope name
        scopeCode: 'system:scopes', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'System API and UI Scopes', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Get System Scopes', // Human-friendly scope name
        scopeCode: 'system:scopes:read', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Read-Only Access for System API and UI Scopes', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage System Types', // Human-friendly scope name
        scopeCode: 'system:types', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'System Assignment, Leave and Training Types', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Get System Types', // Human-friendly scope name
        scopeCode: 'system:types:read', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Read-Only Access for Assignment, Leave and Training Types', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
