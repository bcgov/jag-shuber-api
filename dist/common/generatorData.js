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
    /**
     * @scope SA_ALL_LOCATIONS
     */
    {
        scopeName: 'Special / Super Admin',
        scopeCode: 'SA_SPECIAL',
        systemScopeInd: true,
        description: 'Special privileges for the Super Admin user',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
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
        scopeName: 'Admin Court Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_COURT_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Jail Roles Plugin',
        scopeCode: 'ADMIN_PLUGIN_JAIL_ROLES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Escort Runs Plugin',
        scopeCode: 'ADMIN_PLUGIN_ESCORT_TYPES',
        systemScopeInd: true,
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        scopeName: 'Admin Other Assignments Plugin',
        scopeCode: 'ADMIN_PLUGIN_OTHER_TYPES',
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
/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
exports.defaultFrontendScopePermissions = [
    // Special privileges
    {
        frontendScopeId: null,
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'ALL_LOCATIONS',
        displayName: 'All Locations',
        description: 'If a plugin\'s data is scoped by location, provide an "All Locations" option from the current location',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'SA_DELETE_USER',
        displayName: 'Delete User',
        description: 'User can delete users - the default behavior is to expire',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SA_SPECIAL',
        permissionCode: 'SA_DELETE_USER_ROLE',
        displayName: 'Delete User Role',
        description: 'User can delete user roles - the default behavior is to expire',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // SHERIFF_PROFILE_PLUGIN_<TYPE>
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        permissionCode: 'EDIT_BADGE',
        displayName: 'Can Edit Badge Number',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_IDENT',
        permissionCode: 'EDIT_RANK',
        displayName: 'Can Edit Sheriff Rank',
        description: 'User can edit a sheriff\'s rank',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        permissionCode: 'EDIT_HOME_LOC',
        displayName: 'Can Edit Home Location',
        description: 'User can edit a sheriff\'s home location',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LOCATION',
        permissionCode: 'EDIT_CUR_LOC',
        displayName: 'Can Edit Current Location',
        description: 'User can edit a sheriff\'s current location',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_LEAVES',
        permissionCode: 'MANAGE_LEAVES_DATA',
        displayName: 'Manage Leaves Data',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'SHERIFF_PROFILE_PLUGIN_TRAINING',
        permissionCode: 'MANAGE_TRAINING_DATA',
        displayName: 'Manage Training Data',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PLUGIN_USER_ROLES
    {
        frontendScopeId: null,
        frontendScopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        permissionCode: 'EXPIRE_USER_ROLE',
        displayName: 'Expire User Role',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PLUGIN_COURTROOMS
    {
        frontendScopeId: null,
        frontendScopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        permissionCode: 'MANAGE_ALL',
        displayName: 'Manage All Locations',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'ADMIN_PLUGIN_COURTROOMS',
        permissionCode: 'MANAGE_OWN',
        displayName: 'Manage Own Locations',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // ADMIN_PAGE_USERS
    {
        frontendScopeId: null,
        frontendScopeCode: 'ADMIN_PAGE_USERS',
        permissionCode: 'ADD_USER',
        displayName: 'Add User',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        frontendScopeId: null,
        frontendScopeCode: 'ADMIN_PAGE_USERS',
        permissionCode: 'EDIT_USER',
        displayName: 'Edit User',
        description: '',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
/**
 * IMPORTANT! DO NOT REMOVE! This is the default SYSTEM role.
 */
exports.defaultRoles = [
    {
        roleName: 'System',
        roleCode: 'SYSTEM',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Users with this role are able to define system plugins and APIs',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Setup Users',
        roleCode: 'SYSTEM',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Assigned to the SA user, this role grants master access to users and roles',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
exports.defaultSystemFrontendScopes = [
    {
        roleCode: 'SYSTEM',
        scopeCode: 'SA_SPECIAL',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_API_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_FRONTEND_SCOPES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_USERS',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'ADMIN_PLUGIN_USER_ROLES',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
/**
 * IMPORTANT! DO NOT REMOVE! These role scopes MUST EXIST IN THE SYSTEM.
 */
exports.defaultSystemApiScopes = [
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:scopes:ui',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleCode: 'SYSTEM',
        scopeCode: 'system:scopes:api',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
//# sourceMappingURL=../../src/dist/common/generatorData.js.map