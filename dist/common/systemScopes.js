"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var authentication_1 = require("./authentication");
var createdDtm = moment_1.default(new Date()).toISOString();
var updatedDtm = moment_1.default(new Date()).toISOString();
var createdBy = authentication_1.SYSTEM_USER_DISPLAY_NAME;
var updatedBy = authentication_1.SYSTEM_USER_DISPLAY_NAME;
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist. See authentication.ts, located in the same
 * folder and add each ApiScope.scopeCode value to the Scopes interface to link an application route's security scope
 * to an ApiScope that can be assigned to system users using the frontend application's user interface.
 */
exports.defaultApiScopes = [
    {
        scopeName: 'Admin Sheriff Leaves',
        scopeCode: 'admin:sheriff:leaves',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Sheriff Locations',
        scopeCode: 'admin:sheriff:locations',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Sheriff Training',
        scopeCode: 'admin:sheriff:training',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles',
        scopeCode: 'admin:user:roles',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Users',
        scopeCode: 'admin:users',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Add Sheriffs',
        scopeCode: 'sheriffs:add',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Deactivate Sheriffs',
        scopeCode: 'sheriffs:deactivate',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Delete Sheriffs',
        scopeCode: 'sheriffs:delete',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Edit Sheriffs',
        scopeCode: 'sheriffs:edit',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'View + Search Sheriffs',
        scopeCode: 'sheriffs:view',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Locations',
        scopeCode: 'system:locations',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System API Scopes',
        scopeCode: 'system:scopes:api',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System UI Components',
        scopeCode: 'system:scopes:ui',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Assignment Types',
        scopeCode: 'system:types:assignments',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Leave Types',
        scopeCode: 'system:types:leaves',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'System Training Types',
        scopeCode: 'system:types:training',
        systemScopeInd: true,
        description: '',
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
exports.defaultFrontendScopes = [
    {
        scopeName: 'Admin Users Page',
        scopeCode: 'ADMIN_PAGE_USERS',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin API Scopes Plugin',
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Courtrooms Plugin',
        scopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Frontend Scopes Plugin',
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Leave Types Plugin',
        scopeCode: 'ADMIN_PLUGIN_LEAVE_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Locations Plugin',
        scopeCode: 'ADMIN_PLUGIN_LOCATIONS',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Training Types Plugin',
        scopeCode: 'ADMIN_PLUGIN_TRAINING_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin User Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Identification Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Leaves Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Location Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Roles Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Sheriff Profile Training Plugin',
        scopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../src/dist/common/systemScopes.js.map