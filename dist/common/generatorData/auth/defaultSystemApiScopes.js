"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
exports.defaultSystemApiScopes = [
    {
        roleCode: 'BASIC',
        scopeCode: 'system:scopes:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'BASIC',
        scopeCode: 'system:types:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    // Templated scopes for the ADMIN user - ADMIN is separate from the built-in super-user roles
    // TODO: Remove these two BASIC codes once it is applied to all users
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:scopes:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:types:read',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    // END TODO
    /**
    * @api
    */
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:types',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'system:scopes',
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
        roleCode: 'ADMIN',
        scopeCode: 'users:manage',
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
        roleCode: 'ADMIN',
        scopeCode: 'sheriffs:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'ADMIN',
        scopeCode: 'roles:manage',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultSystemApiScopes.js.map