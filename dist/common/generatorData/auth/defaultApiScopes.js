"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist. See authentication.ts, located in the same
 * folder and add each ApiScope.scopeCode value to the Scopes interface to link an application route's security scope
 * to an ApiScope that can be assigned to system users using the frontend application's user interface.
 */
exports.defaultApiScopes = [
    {
        scopeName: 'Manage Users',
        scopeCode: 'users:manage',
        systemScopeInd: true,
        description: 'Manage Users and User Roles',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'View + Search Users',
        scopeCode: 'users:read',
        systemScopeInd: true,
        description: 'Read-Only Access for Users',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage Roles',
        scopeCode: 'roles:manage',
        systemScopeInd: true,
        description: 'Manage Users and User Roles',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'View + Search Roles',
        scopeCode: 'roles:read',
        systemScopeInd: true,
        description: 'Read-Only Access for Roles',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage Sheriffs',
        scopeCode: 'sheriffs:manage',
        systemScopeInd: true,
        description: 'Create, Update and Deactivate Sheriffs',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Update Sheriffs',
        scopeCode: 'sheriffs:update',
        systemScopeInd: true,
        description: 'Update Sheriff Profile, Leaves and Training',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'View + Search Sheriffs',
        scopeCode: 'sheriffs:read',
        systemScopeInd: true,
        description: 'Read-Only Access for Sheriffs',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage System Locations',
        scopeCode: 'system:locations',
        systemScopeInd: true,
        description: 'System Locations',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Get System Locations',
        scopeCode: 'system:locations:read',
        systemScopeInd: true,
        description: 'Read-Only Access for System Locations',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage System Scopes',
        scopeCode: 'system:scopes',
        systemScopeInd: true,
        description: 'System API and UI Scopes',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Get System Scopes',
        scopeCode: 'system:scopes:read',
        systemScopeInd: true,
        description: 'Read-Only Access for API System API and UI Scopes',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Manage System Types',
        scopeCode: 'system:types',
        systemScopeInd: true,
        description: 'API Assignment, Leave and Training Types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Get System Types',
        scopeCode: 'system:types:read',
        systemScopeInd: true,
        description: 'Read-Only Access for API Assignment, Leave and Training Types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultApiScopes.js.map