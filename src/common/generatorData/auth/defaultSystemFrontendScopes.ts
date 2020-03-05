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
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSADMIN',
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
