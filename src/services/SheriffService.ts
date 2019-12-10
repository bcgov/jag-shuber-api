import { DatabaseService } from "../infrastructure/DatabaseService";
import { Sheriff } from "../models/Sheriff";
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class SheriffService extends DatabaseService<Sheriff> {
    fieldMap = {
        sheriff_id: 'id',
        badge_no: 'badgeNo',
        first_name: 'firstName',
        last_name: 'lastName',
        image_url: 'imageUrl',
        home_location_id: 'homeLocationId',
        current_location_id:'currentLocationId',
        sheriff_rank_code: 'rankCode',
        alias:'alias',
        gender_code: 'genderCode'
    };
    constructor() {
        super('sheriff', 'sheriff_id');
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        if (locationId) {
            query.where(`home_location_id='${locationId}' OR current_location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return rows;
    }
}
