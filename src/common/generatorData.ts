import moment from 'moment';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';

import { SYSTEM_USER_DISPLAY_NAME } from './authentication';
import { FrontendScopePermission } from '../models/FrontendScopePermission';

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

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopePermissions: FrontendScopePermission[] = [
    // Special privileges
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'ALL_LOCATIONS',
        displayName: 'All Locations',
        description: 'If a plugin\'s data is scoped by location, provide an "All Locations" option from the current location', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'SA_DELETE_USER',
        displayName: 'Delete User',
        description: 'User can delete users - the default behavior is to expire', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'SA_DELETE_USER_ROLE',
        displayName: 'Delete User Role',
        description: 'User can delete user roles - the default behavior is to expire', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // SHERIFF_PROFILE_PLUGIN_<TYPE>
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        permissionCode: 'EDIT_BADGE',
        displayName: 'Can Edit Badge Number',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        permissionCode: 'EDIT_RANK',
        displayName: 'Can Edit Sheriff Rank',
        description: 'User can edit a sheriff\'s rank', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        permissionCode: 'EDIT_HOME_LOC',
        displayName: 'Can Edit Home Location',
        description: 'User can edit a sheriff\'s home location', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        permissionCode: 'EDIT_CUR_LOC',
        displayName: 'Can Edit Current Location',
        description: 'User can edit a sheriff\'s current location', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES',
        permissionCode: 'MANAGE_LEAVES_DATA',
        displayName: 'Manage Leaves Data',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING',
        permissionCode: 'MANAGE_TRAINING_DATA',
        displayName: 'Manage Training Data',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PLUGIN_USER_ROLES
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        permissionCode: 'EXPIRE_USER_ROLE',
        displayName: 'Expire User Role',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PLUGIN_COURTROOMS
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        permissionCode: 'MANAGE_ALL',
        displayName: 'Manage All Locations',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        permissionCode: 'MANAGE_OWN',
        displayName: 'Manage Own Locations',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PAGE_USERS
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PAGE_USERS',
        permissionCode: 'ADD_USER',
        displayName: 'Add User',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PAGE_USERS',
        permissionCode: 'EDIT_USER',
        displayName: 'Edit User',
        description: '', // Scope description
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];

/**
 * IMPORTANT! DO NOT REMOVE! This is the default SYSTEM role.
 */
export const defaultRoles = [
    {
        roleName: 'System',
        roleCode: 'SYSTEM',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Users with this role are able to define system plugins and APIs',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Setup Users',
        roleCode: 'SYSTEM',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Assigned to the SA user, this role grants master access to users and roles',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];

/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export const defaultSystemFrontendScopes = [
    {
        roleCode: 'SYSTEM',
        scopeCode: 'SA_SPECIAL',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_USERS',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];

/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export const defaultSystemApiScopes = [
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:scopes:ui', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:scopes:api', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
