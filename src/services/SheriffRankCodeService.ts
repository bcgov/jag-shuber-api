import { SheriffRankCode } from '../models/SheriffRankCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class SheriffRankCodeService extends ExpirableDatabaseService<SheriffRankCode> {
    fieldMap = {
        sheriff_rank_code: 'code',
        description: 'description'
    };

    constructor() {
        super('sheriff_rank_code', 'sheriff_rank_code');
    }

}