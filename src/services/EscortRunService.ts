import { EscortRun } from '../models/EscortRun';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class EscortRunService extends DatabaseService<EscortRun> {
    fieldMap = {
        escort_run_id: 'id',
        title: 'title',
        location_id: 'locationId',
    };

    constructor() {
        super('escort_run', 'escort_run_id');
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        if (locationId) {
            query.where(`location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<EscortRun>(query.toString());
        return rows;
    }
}