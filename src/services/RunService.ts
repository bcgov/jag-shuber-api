import { Run } from '../models/Run';
import { DatabaseService } from './DatabaseService';


export class RunService extends DatabaseService<Run> {
    fieldMap = {
        run_id: 'id',
        title: 'title',
        courthouse_id: 'courthouseId',
    };

    constructor() {
        super('run', 'run_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Run>(query.toString());
        return rows;
    }
}