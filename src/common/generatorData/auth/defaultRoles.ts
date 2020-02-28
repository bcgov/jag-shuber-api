import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

/**
 * IMPORTANT! DO NOT REMOVE! This is the default SYSTEM role.
 */
export const defaultRoles = [
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
        roleCode: 'SETUP',
        // systemCodeInd: '', TODO: This is in the model we may want to implement it later
        description: 'Assigned to the SA user, this role grants master access to users and roles',
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    }
];
