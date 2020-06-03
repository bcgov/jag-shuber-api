import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export const defaultSystemFrontendScopes = [
    {
        roleCode: 'SYSADMIN',
        scopeCode: 'SA_SPECIAL',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSADMIN',
        scopeCode: 'ADMIN_API_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSADMIN',
        scopeCode: 'ADMIN_FRONTEND_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // Templated scopes for the ADMIN user - ADMIN is separate from the built-in super-user roles
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_API_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_FRONTEND_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_PAGE_USERS',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_COURTROOMS',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_COURT_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_JAIL_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_ESCORT_TYPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_OTHER_TYPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_LEAVE_TYPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_TRAINING_TYPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'ADMIN_USER_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'SHERIFF_PROFILE_IDENT',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'SHERIFF_PROFILE_LEAVES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'SHERIFF_PROFILE_LOCATION',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'SHERIFF_PROFILE_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'SHERIFF_PROFILE_TRAINING',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
