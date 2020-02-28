"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/**
 * IMPORTANT! DO NOT REMOVE! This is the default SYSTEM role.
 */
exports.defaultRoles = [
    {
        roleName: 'System',
        roleCode: 'SYSTEM',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Users with this role are able to define system plugins and APIs',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Setup Users',
        roleCode: 'SETUP',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Assigned to the SA user, this role grants master access to users and roles',
        createdBy: index_1.createdBy,
        updatedBy: index_1.updatedBy,
        createdDtm: index_1.createdDtm,
        updatedDtm: index_1.updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../../../src/dist/common/generatorData/auth/defaultRoles.js.map