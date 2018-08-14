import { SheriffRankCode } from '../models/SheriffRankCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';


export class SheriffRankCodeService extends ExpirableDatabaseService<SheriffRankCode> {
    fieldMap = {
        sheriff_rank_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('sheriff_rank_code', 'sheriff_rank_code');
    }

}