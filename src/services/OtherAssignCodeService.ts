import { OtherAssignCode } from '../models/OtherAssignCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';


export class OtherAssignCodeService extends ExpirableDatabaseService<OtherAssignCode> {
    fieldMap = {
        other_assign_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('other_assign_code', 'other_assign_code');
    }

}