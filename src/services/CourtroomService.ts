import { Courtroom } from '../models/Courtroom';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class CourtroomService extends DatabaseService<Courtroom> {
    fieldMap = {
        courtroom_id: 'id',
        courtroom_cd: 'code',
        courthouse_id: 'courthouseId',
        courtroom_name: 'name'
    };

    constructor() {
        super('courtroom', 'courtroom_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Courtroom>(query.toString());
        return rows;
    }
}