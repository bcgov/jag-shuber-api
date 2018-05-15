import { Assignment } from '../models/Assignment';
import { DutyRecurrence } from '../models/DutyRecurrence';
import ExpirableDatabaseService from './ExpirableDatabaseService';
import { DutyRecurrenceService } from './DutyRecurrenceService';
import moment from 'moment';

export class AssignmentService extends ExpirableDatabaseService<Assignment> {

    private dutyRecurrenceService: DutyRecurrenceService;
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
        // Todo: IoC would be better here than explicit construction
        this.dutyRecurrenceService = new DutyRecurrenceService();
    }

    async getById(id: string) {
        const dutyRecurrences = this.dutyRecurrenceService.getAllForAssignment(id);
        const assignment = await super.getById(id);
        if (assignment) {
            assignment.dutyRecurrences = await dutyRecurrences
        }
        return assignment;
    }

    async getAll(courthouseId?: string, startDate?: string, endDate?: string) {
        const query = super.getEffectiveSelectQuery(startDate, endDate);

        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const assignments = await this.executeQuery<Assignment>(query.toString());
        const assignmentIds = assignments.map(a => a.id) as string[];
        const dutyRecurrences = await this.dutyRecurrenceService.getAllForAssignments(assignmentIds, startDate, endDate);
        return assignments.map(assignment => (
            {
                ...assignment,
                dutyRecurrences: dutyRecurrences.filter(dr => dr.assignmentId === assignment.id)
            }
        ))
    }

    async update(entity: Partial<Assignment>): Promise<Assignment> {
        const query = this.getUpdateQuery(entity);
        let updatedAssignment: Assignment = undefined as any;
        const { dutyRecurrences = [] } = entity;
        try {
            await this.db.transaction(async (client) => {
                // Setup the dutyRecurrenceService for transaction
                this.dutyRecurrenceService.dbClient = client;

                // Update the Assignment
                const { rows } = await client.query(query.toString());
                updatedAssignment = rows[0];

                // Create new duty recurrences, adding on assignmentId
                const createPromises = dutyRecurrences
                    .filter(dr => dr.id == undefined)
                    .map(dr => (
                        {
                            ...dr,
                            assignmentId: entity.id
                        }
                    ))
                    .map(dr => this.dutyRecurrenceService.create(dr));

                // Update existing duty recurrences
                const updatePromises = dutyRecurrences
                    .filter(dr => dr.id != undefined)
                    .map(dr => this.dutyRecurrenceService.update(dr));
                const allDutyRecurrences = await Promise.all(createPromises.concat(updatePromises));
                updatedAssignment.dutyRecurrences = allDutyRecurrences;
            });
        } finally {
            // transaction finished, reset dutyRecurrence client
            this.dutyRecurrenceService.dbClient = undefined;
        }

        return updatedAssignment;
    }

    async create(entity: Partial<Assignment>): Promise<Assignment> {
        const { dutyRecurrences = [] } = entity;
        const query = this.getInsertQuery(entity);
        let createdAssignment: Assignment = {} as any;
        try {
            await this.db.transaction(async (client) => {
                this.dutyRecurrenceService.dbClient = client;
                const { rows } = await client.query(query.toString());
                createdAssignment = rows[0];
                createdAssignment.dutyRecurrences = await Promise.all(
                    dutyRecurrences.map(dr => this.dutyRecurrenceService.create({
                        ...dr,
                        assignmentId: createdAssignment.id
                    }))
                );
            });
        } finally {
            this.dutyRecurrenceService.dbClient = undefined;
        }
        return createdAssignment as Assignment;
    }

    async expire(id: string, expiryDate?: string): Promise<void> {
        if (!expiryDate) {
            expiryDate = moment().toISOString();
        }
        const query = this.getExpireQuery(id, expiryDate);
        try {
            this.db.transaction(async client => {
                this.dutyRecurrenceService.dbClient = client;
                const dutyRecurrences = this.dutyRecurrenceService.getAllForAssignment(id);
                // Expire assignment
                await client.query(query.toString());
                const dutyRecurrenceIds = (await dutyRecurrences).map(dr => dr.id) as string[];
                // Expire Duty Recurrences
                await Promise.all(dutyRecurrenceIds.map(id => this.dutyRecurrenceService.expire(id)));
            });
        } finally {
            // Transaction is finished, unset the dutyRecurrence db client
            this.dutyRecurrenceService.dbClient = undefined;
        }




        await this.executeQuery(query.toString());
    }
}