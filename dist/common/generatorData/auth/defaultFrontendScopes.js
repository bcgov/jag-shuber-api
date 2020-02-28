"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
exports.defaultFrontendScopes = [
    /**
     * @scope SA_ALL_LOCATIONS
     */
    {
        scopeName: 'Special / Super Admin',
        scopeCode: 'SA_SPECIAL',
        systemScopeInd: true,
        description: 'Special privileges for the Super Admin user',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Users Page',
        scopeCode: 'ADMIN_PAGE_USERS',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin API Scopes Plugin',
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Frontend Scopes Plugin',
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Courtrooms Plugin',
        scopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Court Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_COURT_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Jail Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_JAIL_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Escort Runs Plugin',
        scopeCode: 'ADMIN_PLUGIN_ESCORT_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Other Assignments Plugin',
        scopeCode: 'ADMIN_PLUGIN_OTHER_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Leave Types Plugin',
        scopeCode: 'ADMIN_PLUGIN_LEAVE_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Training Types Plugin',
        scopeCode: 'ADMIN_PLUGIN_TRAINING_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Identification Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Leaves Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Location Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Roles Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Training Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING',
        systemScopeInd: true,
        description: '',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultFrontendScopes.js.map