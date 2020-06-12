import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { FrontendScopeApi } from '../../../models/FrontendScopeApi';

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopeApis: FrontendScopeApi[] = [
   /**
    * @api
    */
    {
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_PAGE_USERS', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'users:manage', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_API_SCOPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:scopes', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_FRONTEND_SCOPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:scopes', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_COURTROOMS', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_COURT_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_JAIL_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_ESCORT_TYPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_OTHER_TYPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_LEAVE_TYPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_TRAINING_TYPES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:types', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'roles:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:scopes:read', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_USER_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'users:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'ADMIN_USER_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'system:scopes:read', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_IDENT', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_LEAVES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_LOCATION', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_ROLES', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'roles:manage', // Code type for the scope, only used when generating scopes
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
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: 'SHERIFF_PROFILE_TRAINING', // Code type for the scope, only used when generating scopes
        apiScopeCode: 'sheriffs:manage', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
