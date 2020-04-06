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
    },
    // Templated scopes for the ADMIN user - ADMIN is separate from the built-in super-user roles
    // TODO: Remove these two BASIC codes once it is applied to all users
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:scopes:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:types:read', // Not part of the model, just a reference field for our builder
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // END TODO
    /**
    * @api
    */
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:types', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        roleCode: 'ADMIN',
        scopeCode: 'users:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        roleCode: 'ADMIN',
        scopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'roles:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
