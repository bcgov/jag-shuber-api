import { AutoWired, Container } from 'typescript-ioc';
import ExpirableDatabaseService, { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';

import { UserRole } from '../models/UserRole';

@AutoWired
export class UserRoleService extends ExpirableDatabaseService<UserRole> {
    fieldMap = {
        user_role_id: 'id',
        user_id: 'userId',
        role_id: 'roleId',
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
        super('auth_user_role', 'user_role_id');
    }

    async getAll(locationId?: string): Promise<UserRole[]> {
        const query = super.getSelectQuery();

        if (locationId) {
            query.where(`location_id='${locationId}'`);
        };

        const rows = await this.executeQuery<UserRole>(query.toString());
        return rows;
    }

    /**
     * Primarily / exclusively used by TokenService
     * @param userId
     */
    async getByUserId(userId: string) {
        return await this.getEffectiveWhereFieldEquals('userId', userId);
    }
}
