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
                startDateTime: moment().format(),
                endDateTime: moment().add(2, 'hours').format()
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
        
        it.only('should auto assign sheriff duties attached to assignment based on shift', async () => {
            let shift :Shift;
            let sheriffDuty :SheriffDuty;
            await TestUtils.setupTestFixtures(async client=>{
                sheriffDuty = await client.CreateSheriffDuty({
                    dutyId:testDuty.id,
                    startDateTime:testDuty.startDateTime,
                    endDateTime:testDuty.endDateTime
                });
                shift = await client.CreateShift({
                    assignmentId:testAssignment.id,
                    courthouseId:testAssignment.courthouseId,
                    startDateTime:sheriffDuty.startDateTime,
                    endDateTime:sheriffDuty.endDateTime,
                    workSectionId:testAssignment.workSectionId,
                    sheriffId:testSheriff.id
                });
            });
            const autoAssigned = await api.AutoAssignSheriffDuties({
                courthouseId:testCourthouse.id,
                date:sheriffDuty.startDateTime
            });

            expect(autoAssigned).toBeDefined();
            expect(autoAssigned).toEqual(expect.arrayContaining([
                {
                    ...sheriffDuty,
                    sheriffId:testSheriff.id
                }
            ]));

        });

        it('should auto assign the sheriff duty with start time closest to the shift start', async () => {
            throw "UNTESTED";
        });
    });
}) 