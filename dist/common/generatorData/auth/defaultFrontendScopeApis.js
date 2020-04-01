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
        frontendScopeCode: 'ADMIN_PLUGIN_API_SCOPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_COURTROOMS',
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
        frontendScopeCode: 'ADMIN_PLUGIN_COURT_ROLES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_JAIL_ROLES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_ESCORT_TYPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_OTHER_TYPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_LEAVE_TYPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_TRAINING_TYPES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_ROLES',
        apiScopeCode: 'roles:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'ADMIN_PLUGIN_ROLES',
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
        frontendScopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        apiScopeCode: 'users:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'ADMIN_PLUGIN_USER_ROLES',
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
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
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
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES',
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
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
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
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        id: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES',
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
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING',
        apiScopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultFrontendScopeApis.js.map