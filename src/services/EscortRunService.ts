import { EscortRun } from '../models/EscortRun';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class EscortRunService extends ExpirableDatabaseService<EscortRun> {
    fieldMap = {
        escort_run_id: 'id',
        location_id: 'locationId',
        title: 'title', // TODO: Deprecate this in favor of name
        escort_run_code: 'code',
        escort_run_name: 'name',
        description: 'description', // For future use
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        sort_order: 'sortOrder',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('escort_run', 'escort_run_id');
    }

    async getAll(locationId?: string, includeProvincial?: boolean) {
        includeProvincial = includeProvincial || true
        const query = super.getSelectQuery();
        if (locationId) {
            if (includeProvincial) {
                query.where(`location_id='${locationId}' OR location_id IS NULL`);
            } else {
                query.where(`location_id='${locationId}'`);
            }
        } else {
            query.where(`location_id IS NULL`);
        };
        query.order(`location_id IS NOT NULL, title`)
        const rows = await this.executeQuery<EscortRun>(query.toString());
        return rows;
    }
}
