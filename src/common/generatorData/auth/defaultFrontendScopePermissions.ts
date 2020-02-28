import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { FrontendScopePermission } from '../../../models/FrontendScopePermission';

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
