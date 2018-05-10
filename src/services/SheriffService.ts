import { Sheriff } from "../models/Sheriff";
import { DatabaseService } from "./DatabaseService";

export class SheriffService extends DatabaseService<Sheriff> {
    fieldMap = {
        sheriff_id: 'id',
        badge_no: 'badgeNo',
        first_name: 'firstName',
        last_name: 'lastName',
        image_url: 'imageUrl',
        courthouse_id: 'homeCourthouseId',
        sheriff_rank_code: 'rankCode'
    };
    constructor() {
        super('sheriff', 'sheriff_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return rows;
    }
}