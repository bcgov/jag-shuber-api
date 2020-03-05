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
        systemRoleInd: 1, // Denotes that the role cannot be deleted by any user
        description: 'This is the lowest possible level of system access. Without this you will not be able to view the application at all.',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
