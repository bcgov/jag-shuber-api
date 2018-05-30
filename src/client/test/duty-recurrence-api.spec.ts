import moment from 'moment';
import ApiClient from '../ExtendedClient';
import { Assignment, Courthouse, Region, DutyRecurrence, Courtroom } from '../models';
import TestUtils from './TestUtils';

describe('Duty Recurrence API', () => {
    let api: ApiClient;

    let testRegion: Region;
    let testCourthouse: Courthouse;
    let testCourtroom:Courtroom;
    let testAssignment: Assignment;

    const entityToCreate: DutyRecurrence = {
        startTime: "13:00:00",
        endTime: "15:00:00",
        daysBitmap: 1,
        sheriffsRequired: 2,
        assignmentId: "ToReplace"
    };

    let createdEntity: DutyRecurrence;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testRegion = await TestUtils.newTestRegion();
        testCourthouse = await TestUtils.newTestCourthouse(testRegion.id);
        testCourtroom = await TestUtils.newTestCourtroom(testCourthouse.id);
        testAssignment = await TestUtils.newTestAssignment(testCourthouse.id, { courtroomId: testCourtroom.id });
        done();
    });

    it('create should return new Duty Recurrence', async () => {
        createdEntity = await api.CreateDutyRecurrence({
            ...entityToCreate,
            assignmentId: testAssignment.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.assignmentId).toEqual(testAssignment.id);
        TestUtils.assertDutyRecurrence(createdEntity,entityToCreate);        
    });

    it('get by id should return Duty Recurrence', async () => {
        const retrieved = await api.GetDutyRecurrenceById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Duty Recurrences', async () => {
        const list = await api.GetDutyRecurrences();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should respect effective dates',async ()=>{
        const list = await api.GetDutyRecurrences(undefined, moment().subtract(1,'weeks'));
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(0);
    });

    it('expire should set expiry date for duty recurrence and hide from get operation',async ()=>{
        await api.ExpireDutyRecurrence(createdEntity.id);
        const list = await api.GetDutyRecurrences();
        expect(list.some(dr=>dr.id===createdEntity.id)).toBeFalsy();
    })


    it('update duty recurrence should return updated Duty Recurrence', async () => {
        const newEndTime = "17:00:00";
        const updatedEntity = await api.UpdateDutyRecurrence(createdEntity.id, {
            ...createdEntity,
            endTime: newEndTime
        } as DutyRecurrence);
        TestUtils.assertDutyRecurrence(updatedEntity,{
            ...createdEntity,
            endTime:newEndTime
        });        
    });

    it('delete should delete Duty Recurrence', async () => {
        await api.DeleteDutyRecurrence(createdEntity.id);
        const retreived = await api.GetDutyRecurrenceById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 