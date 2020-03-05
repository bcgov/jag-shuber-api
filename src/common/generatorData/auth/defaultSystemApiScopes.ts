import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
export const defaultSystemApiScopes = [
    {
        roleCode: 'BASIC',
        scopeCode: 'system:scopes:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'BASIC',
        scopeCode: 'system:types:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
