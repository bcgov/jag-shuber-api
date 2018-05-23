import { OtherAssignCode } from '../models/OtherAssignCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class OtherAssignCodeService extends ExpirableDatabaseService<OtherAssignCode> {
    fieldMap = {
        other_assign_code: 'code',
        description: 'description'
    };

    constructor() {
        super('other_assign_code', 'other_assign_code');
    }

}