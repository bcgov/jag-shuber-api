import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { Role } from '../models/Role';
import { UserRole } from '../models/UserRole';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class UserRoleService extends ExpirableDatabaseService<UserRole> {
    fieldMap = {
        app_user_role_id: 'id',
        app_user_id: 'userId',
        app_role_id: 'roleId',
        location_id: 'locationId',
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_user_role', 'app_user_role_id');
    }
}
