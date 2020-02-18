import { EscortRun } from '../models/EscortRun';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class EscortRunService extends DatabaseService<EscortRun> {
    fieldMap = {
        escort_run_id: 'id',
        title: 'title',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount',
        location_id: 'locationId'
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