import { CourtRoleCode } from '../models/CourtRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';


export class CourtRoleCodeService extends ExpirableDatabaseService<CourtRoleCode> {
    fieldMap = {
        court_role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('court_role_code', 'court_role_code');
    }

}