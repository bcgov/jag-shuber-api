import { Courtroom } from '../models/Courtroom';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class CourtroomService extends DatabaseService<Courtroom> {
    fieldMap = {
        courtroom_id: 'id',
        courtroom_cd: 'code',
        location_id: 'locationId',
        courtroom_name: 'name'
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