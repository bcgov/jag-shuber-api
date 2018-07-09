import { WorkSectionCode } from '../models/WorkSectionCode';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class WorkSectionCodeService extends ExpirableDatabaseService<WorkSectionCode> {
    fieldMap = {
        work_section_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('work_section_code', 'work_section_code');
    }

}