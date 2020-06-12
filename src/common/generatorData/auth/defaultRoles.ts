import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

/**
 * IMPORTANT! DO NOT REMOVE! These are default roles required by the system. They cannot be deleted by any user.
 */
export const defaultRoles = [
    {
        roleName: 'Master Admin',
        roleCode: 'MASTER',
        systemRoleInd: 1, // Denotes that the role cannot be deleted by any user
        description: 'All permissions granted. This is the top-level administrator account. Configure via OpenShift.',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'System Admin',
        roleCode: 'SYSADMIN',
        systemRoleInd: 1, // Denotes that the role cannot be deleted by any user
        description: 'Recommended ONLY for developers. REQUIRED to reconfigure the system list of APIs and components. Configure via OpenShift.',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    {
        roleName: 'Basic',
        roleCode: 'BASIC',
        systemRoleInd: 0, // Denotes that the role cannot be deleted by any user
        description: 'This is the lowest possible level of system access. Without this you will not be able to view the application at all.',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
    // This is the built-in administrator role - if it doesn't exist, create one so there's a starting template for an Administrator
    // This is separate from the built-in super-user roles
    {
        roleName: 'Administrator',
        roleCode: 'ADMIN',
        systemRoleInd: 0, // Denotes that the role cannot be deleted by any user
        description: 'Administrator level access template. Full permissions except the ability to delete code types, or configure components and apis.',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
