"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
exports.defaultFrontendScopeApis = [
    /**
     * @api
     */
    {
        id: null,
        frontendScopeCode: 'ADMIN_PAGE_USERS',
        apiScopeCode: 'users:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_API_SCOPES',
        apiScopeCode: 'system:scopes',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_FRONTEND_SCOPES',
        apiScopeCode: 'system:scopes',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_COURTROOMS',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_COURT_ROLES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_JAIL_ROLES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_ESCORT_TYPES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_OTHER_TYPES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_LEAVE_TYPES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_TRAINING_TYPES',
        apiScopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_ROLES',
        apiScopeCode: 'roles:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'ADMIN_ROLES',
        apiScopeCode: 'system:scopes:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'ADMIN_USER_ROLES',
        apiScopeCode: 'users:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'ADMIN_USER_ROLES',
        apiScopeCode: 'system:scopes:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_IDENT',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_LEAVES',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_LOCATION',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_ROLES',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_ROLES',
        apiScopeCode: 'roles:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    /**
    * @api
    */
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_TRAINING',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultFrontendScopeApis.js.map