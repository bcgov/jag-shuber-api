import ApiClient from '../ExtendedClient';
import { Assignment, Courthouse, Region, Duty, Courtroom, DutyRecurrence, Sheriff, SheriffDuty, Shift } from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

describe('SheriffDuty API', () => {
    let api: ApiClient;

    let testRegion: Region;
    let testCourthouse: Courthouse;
    let testCourtroom: Courtroom;
    let testAssignment: Assignment;
    let testSheriff: Sheriff;
    let testDuty: Duty;

    beforeAll(async (done) => {
        await TestUtils.clearDatabase();
        await TestUtils.setupTestFixtures(async client => {
            testRegion = await TestUtils.newTestRegion();
            testCourthouse = await TestUtils.newTestCourthouse(testRegion.id as string);
            testCourtroom = await TestUtils.newTestCourtroom(testCourthouse.id as string);
            testAssignment = await TestUtils.newTestAssignment(testCourthouse.id, { courtroomId: testCourtroom.id });
            testSheriff = await TestUtils.newTestSheriff(testCourthouse.id as string);
            testDuty = await client.CreateDuty({
                assignmentId: testAssignment.id,
                startDateTime: moment().startOf('day').add(6, 'hours').format(),
                endDateTime: moment().startOf('day').add(12, 'hours').format()
            })
        });
        api = TestUtils.getClientWithAuth();
        done();
    });

    describe('CRUD Operations', () => {
        let entityUnderTest: SheriffDuty;

        it('Create should return new SheriffDuty', async () => {
            const entityToCreate: SheriffDuty = {
                dutyId: testDuty.id,
                startDateTime: testDuty.startDateTime,
                endDateTime: testDuty.endDateTime
            };
            entityUnderTest = await api.CreateSheriffDuty({
                ...entityToCreate
            });
            expect(entityUnderTest).toBeDefined();
            expect(entityUnderTest.id).toBeDefined();
            expect(entityUnderTest).toMatchObject(entityToCreate);
        });

        it('Update should return updated SheriffDuty', async () => {
            const updatedEntity = await api.UpdateSheriffDuty(entityUnderTest.id, {
                ...entityUnderTest,
                sheriffId: testSheriff.id
            });
            expect(updatedEntity).toMatchObject({
                ...entityUnderTest,
                sheriffId: testSheriff.id
            });
            entityUnderTest = updatedEntity;
        });

        it('Get by id should return SheriffDuty', async () => {
            const gotEntity = await api.GetSheriffDutyById(entityUnderTest.id);
            expect(gotEntity).toMatchObject(entityUnderTest);
        });

        it('Get should return list of SheriffDuty', async () => {
            const entities = await api.GetSheriffDuties();
            expect(entities).toEqual(expect.arrayContaining([entityUnderTest]));
        });

        it('Delete should delete SheriffDuty', async () => {
            await api.DeleteSheriffDuty(entityUnderTest.id);
            const gotEntity = await api.GetSheriffDutyById(entityUnderTest.id);
            expect(gotEntity).not.toBeDefined();
        });
    });

    describe('Auto Assign Sheriff Duties based on shifts', () => {

        let sheriffDutyToCreate: SheriffDuty;
        let shiftToCreate: Shift;

        beforeAll(() => {
            sheriffDutyToCreate = {
                dutyId: testDuty.id,
                startDateTime: testDuty.startDateTime,
                endDateTime: testDuty.endDateTime
            }
            shiftToCreate = {
                assignmentId: testAssignment.id,
                courthouseId: testAssignment.courthouseId,
                startDateTime: sheriffDutyToCreate.startDateTime,
                endDateTime: sheriffDutyToCreate.endDateTime,
                workSectionId: testAssignment.workSectionId,
                sheriffId: testSheriff.id
            }
        });


        it('should auto assign sheriff duties attached to assignment based on shift', async () => {
            let shift: Shift;
            let sheriffDuty: SheriffDuty;
            await TestUtils.setupTestFixtures(async client => {
                // Create sheriff Duty (to be assigned)
                sheriffDuty = await client.CreateSheriffDuty(sheriffDutyToCreate);
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);
            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: sheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned).toEqual(expect.arrayContaining([
                {
                    ...sheriffDuty,
                    sheriffId: testSheriff.id
                }
            ]));
            // Delete the test resources
            await Promise.all([
                api.DeleteShift(shift.id),
                api.DeleteSheriffDuty(sheriffDuty.id)
            ]);
        });

        it('should auto assign the sheriff duty with start time closest to the shift start', async () => {
            let shift: Shift;
            let sheriffDuty: SheriffDuty;
            let sheriffDutyFurther: SheriffDuty;
            await TestUtils.setupTestFixtures(async client => {
                // Create sheriff Duty (to be assigned)
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(sheriffDutyToCreate.startDateTime).add(30, 'minutes').format()
                });
                // Create second duty with earlier start time
                sheriffDutyFurther = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(sheriffDutyToCreate.startDateTime).add(45, 'minutes').format()
                })
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);

            });

            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: testDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned.length).toEqual(1);
            expect(autoAssigned).toEqual(expect.arrayContaining([
                {
                    ...sheriffDuty,
                    sheriffId: testSheriff.id
                }
            ]));

            // Delete the test resources
            await Promise.all([
                api.DeleteShift(shift.id),
                api.DeleteSheriffDuty(sheriffDuty.id),
                api.DeleteSheriffDuty(sheriffDutyFurther.id)
            ]);
        });

        it('should auto assign a sheriff duty for each shift', async () => {
            let shift: Shift;
            let shift2: Shift;
            let sheriffDuty: SheriffDuty;
            let sheriffDutyFurther: SheriffDuty;
            let otherSheriff: Sheriff;
            await TestUtils.setupTestFixtures(async client => {
                // Create sheriff Duty (to be assigned)
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(sheriffDutyToCreate.startDateTime).add(15, 'minutes').format()
                });
                // Create second duty with earlier start time
                sheriffDutyFurther = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(sheriffDutyToCreate.startDateTime).add(30, 'minutes').format()
                })
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);

                otherSheriff = await TestUtils.newTestSheriff(testCourthouse.id, { firstName: "Roger" });
                // Create shift and associate it with the same assignment
                shift2 = await client.CreateShift({
                    ...shiftToCreate,
                    sheriffId: otherSheriff.id
                });

            });

            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: testDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned).toHaveLength(2)
            const possibleAssignments = [
                {
                    ...sheriffDuty,
                    sheriffId: testSheriff.id
                },
                {
                    ...sheriffDutyFurther,
                    sheriffId: otherSheriff.id
                },
                {
                    ...sheriffDutyFurther,
                    sheriffId: testSheriff.id
                },
                {
                    ...sheriffDuty,
                    sheriffId: otherSheriff.id
                }
            ];
            // The order in which sheriffs are assigned is not currently
            // deterministic, so here we make sure that each of our 
            // assigned sheriff duties are within the expected returns
            autoAssigned.forEach(sd => {
                expect(possibleAssignments).toContainEqual(sd)
            });

            // Delete the test resources
            await api.DeleteShift(shift2.id);
            await api.DeleteShift(shift.id);
            await api.DeleteSheriffDuty(sheriffDuty.id);
            await api.DeleteSheriffDuty(sheriffDutyFurther.id);
            await api.DeleteSheriff(otherSheriff.id);
        });

        it('should not auto assign sheriff duties that have already been assigned', async () => {
            let shift: Shift;
            let assignedSheriffDuty: SheriffDuty;
            let sheriffDuty: SheriffDuty;
            await TestUtils.setupTestFixtures(async client => {
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);

                // Create two sheriff duties, one already assigned
                // one unassigned
                // Adjust times to make sure there is no overlap
                assignedSheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    sheriffId: testSheriff.id,
                    endDateTime: moment(shift.startDateTime).add(2, 'hours').format()
                });
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(assignedSheriffDuty.endDateTime).format()
                });

            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: assignedSheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned.length).toEqual(1);
            expect(autoAssigned[0]).toMatchObject({
                ...sheriffDuty,
                sheriffId: shift.sheriffId
            });

            // Delete the test resources
            await Promise.all([
                api.DeleteShift(shift.id),
                api.DeleteSheriffDuty(assignedSheriffDuty.id),
                api.DeleteSheriffDuty(sheriffDuty.id)
            ]);
        });

        it('should only auto-assign sheriff duties with assignments that match shifts', async () => {
            let shift: Shift;
            let otherAssignment: Assignment;
            let sheriffDuty: SheriffDuty;
            let otherDuty: Duty;
            await TestUtils.setupTestFixtures(async client => {
                // Create sheriff Duty tied to different assignment
                otherAssignment = await TestUtils.newTestAssignment(testCourthouse.id, { courtroomId: testCourtroom.id });
                otherDuty = await client.CreateDuty({
                    assignmentId: otherAssignment.id,
                    startDateTime: testDuty.startDateTime,
                    endDateTime: testDuty.endDateTime
                });
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    dutyId: otherDuty.id
                });

                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);
            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: sheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned.length).toEqual(0);

            // Delete the test resources            
            await api.DeleteShift(shift.id);
            await api.DeleteSheriffDuty(sheriffDuty.id);
            await api.DeleteDuty(otherDuty.id);
            await TestUtils.deleteAssignment(otherAssignment.id);
        });

        it('should not auto assign sheriff duties if it will result in double booking', async () => {
            let shift: Shift;
            let sheriffDuty: SheriffDuty;
            let assignedSheriffDuty: SheriffDuty;
            await TestUtils.setupTestFixtures(async client => {
                // Create sheriff Duty that is already assigned
                assignedSheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    sheriffId: testSheriff.id
                });
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(assignedSheriffDuty.startDateTime).add(15, 'minutes').format(),
                    endDateTime: moment(assignedSheriffDuty.endDateTime).subtract(15, 'minutes').format()
                });
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);
            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: sheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned).toHaveLength(0);

            // Delete the test resources
            await Promise.all([
                api.DeleteShift(shift.id),
                api.DeleteSheriffDuty(sheriffDuty.id),
                api.DeleteSheriffDuty(assignedSheriffDuty.id)
            ]);
        });

        it('Should not auto assign sheriff to sheriff duty if sheriff duty falls outside of shift', async () => {
            let shift: Shift;
            let sheriffDuty: SheriffDuty;
            await TestUtils.setupTestFixtures(async client => {
                // Create shift and associate it with the same assignment
                shift = await client.CreateShift(shiftToCreate);

                // Create sheriff Duty tied to different assignment
                sheriffDuty = await client.CreateSheriffDuty({
                    ...sheriffDutyToCreate,
                    startDateTime: moment(shift.endDateTime).format(),
                    endDateTime: moment(shift.endDateTime).add(2,'hours').format()
                });
            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId: testCourthouse.id,
                date: sheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned.length).toEqual(0);

            // Delete the test resources            
            await api.DeleteShift(shift.id);
            await api.DeleteSheriffDuty(sheriffDuty.id);
        });
    });
}) 