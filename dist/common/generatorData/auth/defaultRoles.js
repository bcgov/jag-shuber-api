"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! These are default roles required by the system. They cannot be deleted by any user.
 */
exports.defaultRoles = [
    {
        roleName: 'Master Admin',
        roleCode: 'MASTER',
        systemRoleInd: 1,
        description: 'All permissions granted. This is the top-level administrator account. Configure via OpenShift.',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'System Admin',
        roleCode: 'SYSADMIN',
        systemRoleInd: 1,
        description: 'Recommended ONLY for developers. REQUIRED to reconfigure the system list of APIs and components. Configure via OpenShift.',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Basic',
        roleCode: 'BASIC',
        systemRoleInd: 1,
        description: 'This is the lowest possible level of system access. Without this you will not be able to view the application at all.',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Administrator',
        roleCode: 'ADMIN',
        systemRoleInd: 1,
        description: 'Administrator level access. Full permissions except the ability to delete code types, or configure components and apis.',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultRoles.js.map