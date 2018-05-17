import ApiClient from '../ExtendedClient';
import { Assignment, Courthouse, Region, Duty, Courtroom } from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

describe('Duty API', () => {
    let api: ApiClient;

    let testRegion: Region;
    let testCourthouse: Courthouse;
    let testCourtroom: Courtroom;
    let testAssignment: Assignment;

    const entityToCreate: Duty = {
        startDateTime: moment().toISOString(),
        endDateTime: moment().add(1, 'hours').toISOString(),
        sheriffsRequired: 2,
        assignmentId: "ToReplace"
    };

    let createdEntity: Duty;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testRegion = await TestUtils.newTestRegion();
        testCourthouse = await TestUtils.newTestCourthouse(testRegion.id);
        testCourtroom = await TestUtils.newTestCourtroom(testCourthouse.id);
        testAssignment = await TestUtils.newTestAssignment(testCourthouse.id, { courtroomId: testCourtroom.id });
        done();
    });

    it('create should return new Duty', async () => {
        createdEntity = await api.CreateDuty({
            ...entityToCreate,
            assignmentId: testAssignment.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.assignmentId).toEqual(testAssignment.id);
        expect(createdEntity).toEqual({
            ...createdEntity,
            ...entityToCreate,
            assignmentId: testAssignment.id
        });
    });

    it('get by id should return Duty', async () => {
        const retrieved = await api.GetDutyById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Duties', async () => {
        const list = await api.GetDuties();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('update duty should return updated Duty', async () => {
        const newEndDateTime = moment().add(4, 'hour').toISOString()
        const updatedEntity = await api.UpdateDuty(createdEntity.id, {
            ...createdEntity,
            endDateTime: newEndDateTime
        } as Duty);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            endDateTime: newEndDateTime,
        });
    });

    it('delete should delete Duty', async () => {
        await api.DeleteDuty(createdEntity.id);
        const retreived = await api.GetDutyById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 