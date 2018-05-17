import { Assignment } from '../models/Assignment';
import { DutyRecurrence } from '../models/DutyRecurrence';
import ExpirableDatabaseService, { EffectiveQueryOptions } from './ExpirableDatabaseService';
import { DutyRecurrenceService } from './DutyRecurrenceService';
import moment from 'moment';
import { ValidateError, FieldErrors } from 'tsoa';
import { ClientBase } from 'pg';
import { CourtroomService } from './CourtroomService';
import { JailRoleCodeService } from './JailRoleCodeService';
import { RunService } from './RunService';
import { OtherAssignCodeService } from './OtherAssignCodeService';

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
        work_section_code: 'workSectionId'
    };

    constructor() {
        super('assignment', 'assignment_id', true);
        // Todo: IoC would be better here than explicit construction
        this.dutyRecurrenceService = new DutyRecurrenceService();
    }

    async getById(id: string) {
        const dutyRecurrences = this.dutyRecurrenceService.getAllForAssignment(id, { includeExpired: true });
        const assignment = await super.getById(id);
        if (assignment) {
            assignment.dutyRecurrences = await dutyRecurrences
        }
        return assignment;
    }

    async getAll(courthouseId?: string, options?: EffectiveQueryOptions) {
        const query = super.getEffectiveSelectQuery(options);

        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const assignments = await this.executeQuery<Assignment>(query.toString());
        const assignmentIds = assignments.map(a => a.id) as string[];
        const dutyRecurrences = await this.dutyRecurrenceService.getAllForAssignments(assignmentIds, options);
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

                const dutyRecurrencesWithAssignmentId = dutyRecurrences.map(dr => ({
                    ...dr,
                    assignmentId: entity.id
                }));
                // Create new duty recurrences, adding on assignmentId
                const createPromises = dutyRecurrencesWithAssignmentId
                    .filter(dr => dr.id == undefined)
                    .map(dr => this.dutyRecurrenceService.create(dr));

                // Update existing duty recurrences
                const updatePromises = dutyRecurrencesWithAssignmentId
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

    private validateAssignment(entity: Partial<Assignment>) {
        const fieldErrors: FieldErrors = {};
        if (entity.workSectionId === "COURTS") {
            if (entity.courtroomId == undefined) {
                throw new ValidateError({
                    'model.courtroomId': {
                        message: "Courtroom must be set for Court assignments"
                    }
                }, "Invalid Court Assignment")
            }
        } else if (entity.workSectionId === "JAIL") {
            if (entity.jailRoleCode == undefined) {
                throw new ValidateError({
                    'model.jailRoleCode': {
                        message: "Jail Role must be set for Jail assignments"
                    }
                }, "Invalid Jail Assignment")
            }
        } else if (entity.workSectionId === "OTHER") {
            if (entity.otherAssignCode == undefined) {
                throw new ValidateError({
                    'model.otherAssignCode': {
                        message: "Assignment Type must be set for Other assignments"
                    }
                }, "Invalid Other Assignment")
            }
        } else if (entity.workSectionId === "ESCORTS") {
            if (entity.runId == undefined) {
                throw new ValidateError({
                    'model.runId': {
                        message: "Run must be set for Escort assignments"
                    }
                }, "Invalid Escort Assignment")
            }
        }
    }

    private async getAssignmentTitle(entity: Partial<Assignment>): Promise<string> {
        let title = entity.title;

        if (!title || title === "") {
            if (entity.workSectionId === "COURTS") {
                const service = new CourtroomService();
                const courtroom = await service.getById(entity.courtroomId as string);
                if (courtroom) {
                    title = courtroom.name;
                }
            } else if (entity.workSectionId === "JAIL") {
                const service = new JailRoleCodeService();
                const code = await service.getById(entity.jailRoleCode as string);
                if (code) {
                    title = code.description;
                }
            } else if (entity.workSectionId === "ESCORTS") {
                const service = new RunService();
                const run = await service.getById(entity.runId as string);
                if (run) {
                    title = run.title;
                }
            } else if (entity.workSectionId === "OTHER") {
                const service = new OtherAssignCodeService();
                const code = await service.getById(entity.otherAssignCode as string);
                if (code) {
                    title = code.description;
                }
            }
        }
        return title as string;
    }

    async create(entity: Partial<Assignment>): Promise<Assignment> {
        this.validateAssignment(entity);
        const { dutyRecurrences = [] } = entity;
        const title = await this.getAssignmentTitle(entity);
        const query = this.getInsertQuery({
            ...entity,
            title
        });
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
        } catch (e) {
            throw e;
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
                const dutyRecurrences = this.dutyRecurrenceService.getAllForAssignment(id, { includeExpired: true });
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

    async delete(id: string): Promise<void> {
        const delAssignmentQuery = this.getDeleteQuery(id);
        await this.db.transaction(async (client) => {
            const delRecurrenceQuery = this.dutyRecurrenceService.squel.delete()
                .from(this.dutyRecurrenceService.dbTableName)
                .where(`assignment_id='${id}'`);
            await client.query(delRecurrenceQuery.toString());
            await client.query(delAssignmentQuery.toString());
        });
    }
}