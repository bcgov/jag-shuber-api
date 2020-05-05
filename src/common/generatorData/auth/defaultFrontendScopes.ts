import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { FrontendScope } from '../../../models/FrontendScope';

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopes: FrontendScope[] = [
   /**
    * @scope SA_ALL_LOCATIONS
    */
    {
        scopeName: 'Special / Super Admin', // Human-friendly scope name
        scopeCode: 'SA_SPECIAL', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: 'Special privileges for the Super Admin user',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
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
        scopeName: 'Admin API Scopes', // Human-friendly scope name
        scopeCode: 'ADMIN_API_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Frontend Scopes', // Human-friendly scope name
        scopeCode: 'ADMIN_FRONTEND_SCOPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Courtrooms', // Human-friendly scope name
        scopeCode: 'ADMIN_COURTROOMS', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Court Roles', // Human-friendly scope name
        scopeCode: 'ADMIN_COURT_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Jail Roles', // Human-friendly scope name
        scopeCode: 'ADMIN_JAIL_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Escort Runs', // Human-friendly scope name
        scopeCode: 'ADMIN_ESCORT_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Other Assignments', // Human-friendly scope name
        scopeCode: 'ADMIN_OTHER_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Leave Types', // Human-friendly scope name
        scopeCode: 'ADMIN_LEAVE_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Training Types', // Human-friendly scope name
        scopeCode: 'ADMIN_TRAINING_TYPES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Roles', // Human-friendly scope name
        scopeCode: 'ADMIN_ROLES', // Code type for the scope
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
        scopeCode: 'ADMIN_USER_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Identification', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_IDENT', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Leaves', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_LEAVES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Location', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_LOCATION', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Roles', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_ROLES', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Training', // Human-friendly scope name
        scopeCode: 'SHERIFF_PROFILE_TRAINING', // Code type for the scope
        systemScopeInd: true, // Is the scope required by the SYSTEM
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
