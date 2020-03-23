import { Courtroom } from '../models/Courtroom';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class CourtroomService extends ExpirableDatabaseService<Courtroom> {
    fieldMap = {
        courtroom_id: 'id',
        location_id: 'locationId',
        courtroom_cd: 'code',
        courtroom_name: 'name',
        description: 'description', // For future use
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('courtroom', 'courtroom_id');
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        if (locationId) {
            query.where(`location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<Courtroom>(query.toString());
        return rows;
    }
}