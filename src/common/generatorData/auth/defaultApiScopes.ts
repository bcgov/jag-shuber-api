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
        scopeName: 'Admin Sheriff Leaves', // Human-friendly scope name
        scopeCode: 'admin:sheriff:leaves', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Sheriff Locations', // Human-friendly scope name
        scopeCode: 'admin:sheriff:locations', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Sheriff Training', // Human-friendly scope name
        scopeCode: 'admin:sheriff:training', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles', // Human-friendly scope name
        scopeCode: 'admin:user:roles', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Users', // Human-friendly scope name
        scopeCode: 'admin:users', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Add Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:add', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Deactivate Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:deactivate', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Delete Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:delete', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Edit Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:edit', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'View + Search Sheriffs', // Human-friendly scope name
        scopeCode: 'sheriffs:view', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Locations', // Human-friendly scope name
        scopeCode: 'system:locations', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System API Scopes', // Human-friendly scope name
        scopeCode: 'system:scopes:api', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System UI Components', // Human-friendly scope name
        scopeCode: 'system:scopes:ui', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Assignment Types', // Human-friendly scope name
        scopeCode: 'system:types:assignments', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Leave Types', // Human-friendly scope name
        scopeCode: 'system:types:leaves', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Training Types', // Human-friendly scope name
        scopeCode: 'system:types:training', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
