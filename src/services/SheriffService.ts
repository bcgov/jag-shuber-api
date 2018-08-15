import { Sheriff } from "../models/Sheriff";
import { DatabaseService } from "../infrastructure/DatabaseService";
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class SheriffService extends DatabaseService<Sheriff> {
    fieldMap = {
        sheriff_id: 'id',
        badge_no: 'badgeNo',
        first_name: 'firstName',
        last_name: 'lastName',
        image_url: 'imageUrl',
        home_courthouse_id: 'homeCourthouseId',
        current_courthouse_id:'currentCourthouseId',
        sheriff_rank_code: 'rankCode',
        alias:'alias',
        gender_code: 'genderCode'
    };
    constructor() {
        super('sheriff', 'sheriff_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`home_courthouse_id='${courthouseId}' OR current_courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return rows;
    }
}