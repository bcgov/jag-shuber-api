import moment from 'moment';
import ApiClient from '../ExtendedClient';
import { Assignment, Courthouse, Region, DutyRecurrence, Courtroom, Run, JailRoleCode, OtherAssignCode } from '../models';
import TestUtils from './TestUtils';
import { create } from 'domain';

describe('Assignment API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Assignment Testing Region",
        code: TestUtils.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Assignment Testing Courthouse",
        code: TestUtils.randomString(5)
    }

    let testCourtroom: Courtroom = {
        code: TestUtils.randomString(5),
        name: "TEST Courtroom"
    }

    const entityToCreate: Assignment = {
        title: "Test Assignment",
        workSectionId: "COURTS",
        courthouseId: "ToReplace",
        dutyRecurrences: []
    };

    const recurrenceToCreate: DutyRecurrence = {
        daysBitmap: 1,
        sheriffsRequired: 3,
        startTime: '11:00:00',
        endTime: '13:00:00'
    };

    const recurrenceShape: DutyRecurrence = {
        ...recurrenceToCreate,
        assignmentId: "string",
        expiryDate: null,
        effectiveDate: "string",
        id: "string"
    }

    let createdEntities: Assignment[] = [];
    let createdEntity: Assignment;
    let createdEntityWithRecurrence: Assignment;

    function getEntity(): Assignment {
        const assign: Assignment = {
            ...entityToCreate,
            courthouseId: testCourthouse.id,
            courtroomId: testCourtroom.id
        }
        return assign;
    }

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        testCourtroom = await api.CreateCourtroom({ ...testCourtroom, courthouseId: testCourthouse.id });
        done();
    });

    it('create with no duty recurrences should return new Assignment with empty duty recurrences', async () => {
        createdEntity = await api.CreateAssignment({...getEntity()});
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.courthouseId).toEqual(testCourthouse.id);
        expect(createdEntity).toEqual({
            ...createdEntity,
            ...entityToCreate,
            courthouseId: testCourthouse.id
        });

        createdEntities.push(createdEntity);
    });

    it('create with duty recurrences should return new assignment with duty recurrences', async () => {
        createdEntityWithRecurrence = await api.CreateAssignment({
            ...getEntity(),
            dutyRecurrences: [
                { ...recurrenceToCreate }
            ]
        });

        expect(createdEntityWithRecurrence).toBeDefined();
        expect(createdEntityWithRecurrence.dutyRecurrences).toBeDefined();
        expect(createdEntityWithRecurrence.dutyRecurrences.length).toEqual(1);
        const createdRecurrence = createdEntityWithRecurrence.dutyRecurrences[0];

        // Check the shape of the object returned
        expect(createdRecurrence).toMatchShapeOf(recurrenceShape);
        // check assignment id and effective date
        expect(createdRecurrence.assignmentId).toEqual(createdEntityWithRecurrence.id);
        expect(moment(createdRecurrence.effectiveDate).isSame(moment(), 'day'));

        // check that all values are same as those created
        expect(createdRecurrence).toEqual({
            ...createdRecurrence,
            ...recurrenceToCreate
        });
        createdEntities.push(createdEntityWithRecurrence);
    });

    it('get by id should return Assignment', async () => {
        const retrieved = await api.GetAssignmentById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
        const retrievedWithRecurrence = await api.GetAssignmentById(createdEntityWithRecurrence.id);
        expect(retrievedWithRecurrence).toMatchObject(createdEntityWithRecurrence);
    });

    it('get List should return list of Assignments', async () => {
        const list = await api.GetAssignments();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list).toEqual(expect.arrayContaining(createdEntities));
    });

    it('get list should return only those Assignments in courthouse if specified', async () => {
        const secondTestCourthouse = { ...testCourthouse }
        delete secondTestCourthouse['id'];
        secondTestCourthouse.name = "Test Courthouse 2";
        secondTestCourthouse.code = TestUtils.randomString(5);
        const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
        const secondEntity = await api.CreateAssignment({
            ...getEntity(),
            name: "second Assignment",
            courthouseId: secondCourthouse.id
        } as Assignment);
        createdEntities.push(secondEntity);

        let list = await api.GetAssignments();
        expect(list).toEqual(expect.arrayContaining(createdEntities));

        list = await api.GetAssignments(secondCourthouse.id);
        expect(list).toEqual(expect.arrayContaining([secondEntity]));
    });

    it('get list should respect effective dates', async () => {
        const list = await api.GetAssignments(undefined, moment().subtract(1, 'weeks'));
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(0);
    });

    it('expire should set expiry date for assignment and hide from get operation', async () => {
        await api.ExpireAssignment(createdEntity.id);
        const list = await api.GetAssignments();
        expect(list.some(a => a.id === createdEntity.id)).toBeFalsy();
    });

    it('update Assignment should return updated Assignment', async () => {
        const newTitle = "New Assignment Name";
        const updatedEntity = await api.UpdateAssignment(createdEntity.id, {
            ...createdEntity,
            title: newTitle
        } as Assignment);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            title: newTitle,
        });
    });

    it('update should create/update duty recurrence objects', async () => {
        const newTitle = "New assignment with recurrence";
        const additionalRecurrence: DutyRecurrence = {
            ...recurrenceToCreate,
            startTime: "09:00:00",
            endTime: "11:30:00",
            sheriffsRequired: 5
        };
        const recurrenceToUpdate: DutyRecurrence = {
            ...createdEntityWithRecurrence.dutyRecurrences[0],
            endTime: "17:30:00",
            sheriffsRequired: 12
        }
        const updatedEntityWithRecurrence = await api.UpdateAssignment(createdEntity.id, {
            ...createdEntityWithRecurrence,
            title: newTitle,
            dutyRecurrences: [
                additionalRecurrence,
                recurrenceToUpdate
            ]
        });

        expect(updatedEntityWithRecurrence.title).toEqual(newTitle);
        const recurrences = updatedEntityWithRecurrence.dutyRecurrences;
        expect(Array.isArray(recurrences)).toBeTruthy();
        expect(recurrences.length).toEqual(2);
        expect(recurrences.every(r => r.id != undefined)).toBeTruthy();
        expect(recurrences.find(r => r.id === recurrenceToUpdate.id)).toEqual(
            recurrenceToUpdate
        );
        const newRecurrence = recurrences.find(r => r.id !== recurrenceToUpdate.id);
        expect(newRecurrence).toMatchShapeOf(recurrenceShape);
        expect(newRecurrence.assignmentId).toEqual(createdEntityWithRecurrence.id);
        expect(newRecurrence.daysBitmap).toEqual(additionalRecurrence.daysBitmap);
        expect(newRecurrence.startTime).toEqual(additionalRecurrence.startTime);
        expect(newRecurrence.endTime).toEqual(additionalRecurrence.endTime);
        expect(newRecurrence.sheriffsRequired).toEqual(additionalRecurrence.sheriffsRequired);
    });

    it('expiring a duty recurrence should hide it from the assignments list but not from get by id', async () => {
        createdEntityWithRecurrence = await api.GetAssignmentById(createdEntityWithRecurrence.id);
        const firstRecurrence = createdEntityWithRecurrence.dutyRecurrences[0];
        const secondRecurrence = createdEntityWithRecurrence.dutyRecurrences[1];
        await api.ExpireDutyRecurrence(firstRecurrence.id);

        const list = await api.GetAssignments();
        const retrieved = list.find(a => a.id === createdEntityWithRecurrence.id);
        expect(retrieved.dutyRecurrences.length).toEqual(1);
        expect(retrieved.dutyRecurrences.find(r => r.id === firstRecurrence.id)).not.toBeDefined();
        expect(retrieved.dutyRecurrences[0]).toEqual(secondRecurrence);

        // When getting assignment by Id, we should grab all of the duty recurrences regardless of expiry
        const retrievedById = await api.GetAssignmentById(createdEntityWithRecurrence.id);
        expect(retrievedById.dutyRecurrences.map(dr => dr.id)).toEqual(expect.arrayContaining(createdEntityWithRecurrence.dutyRecurrences.map(dr => dr.id)));
    });

    it('delete should delete Assignment', async () => {
        await api.DeleteAssignment(createdEntity.id);
        const retreived = await api.GetAssignmentById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });

    it('deleting an assignment should delete its recurrences', async () => {
        await api.DeleteAssignment(createdEntityWithRecurrence.id);
        await createdEntityWithRecurrence.dutyRecurrences
            .map(dr => dr.id)
            .forEach(async id => {
                const recurrence = await api.GetDutyRecurrenceById(id);
                expect(recurrence).not.toBeDefined();
            })
    });

    describe('Different types of assignments', () => {
        let testRun: Run = {
            title: "Test Run",
        }

        let testCourtroom: Courtroom = {
            name: "Testing Courtroom",
            code: TestUtils.randomString(5)
        }
        let testJailRoleCode: JailRoleCode;
        let testOtherAssignCode: OtherAssignCode;

        const entitiesToDelete: Assignment[] = [];

        beforeAll(async (done) => {
            testRun = await api.CreateRun({
                ...testRun,
                courthouseId: testCourthouse.id
            });
            testCourtroom = await api.CreateCourtroom({
                ...testCourtroom,
                courthouseId: testCourthouse.id
            });
            testJailRoleCode = (await api.GetJailRoleCodes())[0];
            testOtherAssignCode = (await api.GetOtherAssignCodes())[0];
            done();
        })

        it('when title is specified, assignments should use that title', async () => {
            const title = "Hello Title";
            let noTitleEntity: Assignment = await api.CreateAssignment({
                ...entityToCreate,
                courthouseId: testCourthouse.id,
                workSectionId: "COURTS",
                courtroomId: testCourtroom.id,
                title
            });
            const retreived = await api.GetAssignmentById(noTitleEntity.id);
            expect(retreived.title).toEqual(title);
        });

        it('Court assignment with no courtroom should throw validation error', async () => {
            expect.assertions(3);
            try {
                let courtAssignment: Assignment = await api.CreateAssignment({
                    ...entityToCreate,
                    workSectionId: "COURTS",
                    title: null,
                    courthouseId: testCourthouse.id
                });
            } catch (err) {
                const { response: { body: {
                    fields = {},
                    message = "",
                    name = ""
                } = {} } = {} } = err;
                expect(message).toEqual("Invalid Court Assignment");
                expect(name).toEqual("ValidateError");
                expect(fields['model.courtroomId']!.message).toEqual("Courtroom must be set for Court assignments");
            }
        });

        it('Court assignment with no title should default to courtroom name', async () => {
            let courtAssignment: Assignment = await api.CreateAssignment({
                ...entityToCreate,
                title: null,
                workSectionId: "COURTS",
                courthouseId: testCourthouse.id,
                courtroomId: testCourtroom.id
            });
            expect(courtAssignment.id).toBeDefined();
            expect(courtAssignment.workSectionId).toEqual("COURTS");
            expect(courtAssignment.courtroomId).toEqual(testCourtroom.id);
            expect(courtAssignment.title).toEqual(testCourtroom.name);
        });

        it('Jail assignment with no jail should throw validation error', async () => {
            expect.assertions(3);
            try {
                let courtAssignment: Assignment = await api.CreateAssignment({
                    ...entityToCreate,
                    workSectionId: "JAIL",
                    title: null,
                    courthouseId: testCourthouse.id
                });
            } catch (err) {
                const { response: { body: {
                    fields = {},
                    message = "",
                    name = ""
                } = {} } = {} } = err;
                expect(message).toEqual("Invalid Jail Assignment");
                expect(name).toEqual("ValidateError");
                expect(fields['model.jailRoleCode']!.message).toEqual("Jail Role must be set for Jail assignments");
            }
        });

        it('Jail assignment with no title should default to Jail Role description', async () => {
            const jailAssignment: Assignment = {
                ...entityToCreate,
                title: null,
                workSectionId: "JAIL",
                courthouseId: testCourthouse.id,
                jailRoleCode: testJailRoleCode.code
            }

            let assignment: Assignment = await api.CreateAssignment(jailAssignment);
            expect(assignment.id).toBeDefined();
            expect(assignment.workSectionId).toEqual("JAIL");
            expect(assignment.jailRoleCode).toEqual(testJailRoleCode.code);
            expect(assignment.title).toEqual(testJailRoleCode.description);
        });

        it('Escort assignment with no run should throw validation error', async () => {
            expect.assertions(3);
            try {
                let assignment: Assignment = await api.CreateAssignment({
                    ...entityToCreate,
                    workSectionId: "ESCORTS",
                    title: null,
                    courthouseId: testCourthouse.id
                });
            } catch (err) {
                const { response: { body: {
                    fields = {},
                    message = "",
                    name = ""
                } = {} } = {} } = err;
                expect(message).toEqual("Invalid Escort Assignment");
                expect(name).toEqual("ValidateError");
                expect(fields['model.runId']!.message).toEqual("Run must be set for Escort assignments");
            }
        });

        it('Escort assignment with no title should default to Run Name', async () => {
            let assignment: Assignment = await api.CreateAssignment({
                ...entityToCreate,
                title: null,
                workSectionId: "ESCORTS",
                courthouseId: testCourthouse.id,
                runId: testRun.id
            });
            expect(assignment.id).toBeDefined();
            expect(assignment.workSectionId).toEqual("ESCORTS");
            expect(assignment.runId).toEqual(testRun.id);
            expect(assignment.title).toEqual(testRun.title);
        });


        it('Other assignment with no other assignment type should throw validation error', async () => {
            expect.assertions(3);
            try {
                let assignment: Assignment = await api.CreateAssignment({
                    ...entityToCreate,
                    workSectionId: "OTHER",
                    title: null,
                    courthouseId: testCourthouse.id
                });
            } catch (err) {
                const { response: { body: {
                    fields = {},
                    message = "",
                    name = ""
                } = {} } = {} } = err;
                expect(message).toEqual("Invalid Other Assignment");
                expect(name).toEqual("ValidateError");
                expect(fields['model.otherAssignCode']!.message).toEqual("Assignment Type must be set for Other assignments");
            }
        });

        it('Other assignment with no title should default to Other Assignment Type Name', async () => {
            let assignment: Assignment = await api.CreateAssignment({
                ...entityToCreate,
                title: null,
                workSectionId: "OTHER",
                courthouseId: testCourthouse.id,
                otherAssignCode: testOtherAssignCode.code
            });
            expect(assignment.id).toBeDefined();
            expect(assignment.workSectionId).toEqual("OTHER");
            expect(assignment.otherAssignCode).toEqual(testOtherAssignCode.code);
            expect(assignment.title).toEqual(testOtherAssignCode.description);
        });

    })
}) 