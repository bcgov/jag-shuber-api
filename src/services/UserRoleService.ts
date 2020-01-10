import { AutoWired, Container } from 'typescript-ioc';
import ExpirableDatabaseService, { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';

import { UserRole } from '../models/UserRole';

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

    async getAll(locationId?: string, options?: EffectiveQueryOptions): Promise<UserRole[]> {
        const query = super.getEffectiveSelectQuery(options);

        if (locationId) {
            query.where(`location_id='${locationId}'`);
        };
    
        const rows = await this.executeQuery<UserRole>(query.toString());
        return rows;    
    }

    async getByUserId(userId: string) {
        return await this.getWhereFieldEquals('userId', userId);
    }
}
