import { Assignment } from '../models/Assignment';
import ExpirableDatabaseService from './ExpirableDatabaseService';


export class AssignmentService extends ExpirableDatabaseService<Assignment> {
    fieldMap = {
        assignment_id: 'id',
        title: 'title',
        courthouse_id: 'courthouseId',
        courtroom_id: 'courtroomId',
        run_id: 'runId',
        jail_role_code: 'jailRoleCode',
        other_assign_code: 'otherAssignCode',
        work_section_code: 'workSectionCode',
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('assignment', 'assignment_id', true);
    }

    async getAll(courthouseId?: string, startDate?: string, endDate?: string) {
        const query = super.getEffectiveSelectQuery(startDate,endDate);
        
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Assignment>(query.toString());
        return rows;
    }
}