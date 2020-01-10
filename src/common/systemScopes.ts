import moment from 'moment';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';

import { SYSTEM_USER_DISPLAY_NAME } from './authentication';

const createdDtm = moment(new Date()).toISOString();
const updatedDtm = moment(new Date()).toISOString();
const createdBy = SYSTEM_USER_DISPLAY_NAME;
const updatedBy = SYSTEM_USER_DISPLAY_NAME;

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

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopes: FrontendScope[] = [
    {
        scopeName: 'Admin Users Page', // Human-friendly scope name
        scopeCode: 'ADMIN_PAGE_USERS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin API Scopes Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Courtrooms Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_COURTROOMS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Frontend Scopes Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Leave Types Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_LEAVE_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Locations Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_LOCATIONS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Training Types Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_TRAINING_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles Plugin', // Human-friendly scope name
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Identification Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Leaves Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Location Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Roles Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Training Plugin', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
