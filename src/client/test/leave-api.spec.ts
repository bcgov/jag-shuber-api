import ApiClient from '../ExtendedClient';
import { Region, Leave, Sheriff, Courthouse } from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

describe('Leave API', () => {
    let api: ApiClient;

    let entityToCreate: Leave = {
        leaveCode: "PERSONAL",
        leaveSubCode: "STIP",
        startDate: moment().format()
    };

    let createdEntity: Leave;

    let createdEntity2: Leave;

    let testRegion: Region = {
        name: "Shift Testing Region",
        code: TestUtils.randomString(5)
    }

    let testCourthouse: Courthouse = {
        name: "Shift Testing Courthouse",
        code: TestUtils.randomString(5)
    }

    let testSheriff: Sheriff;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        testSheriff = await api.CreateSheriff(
            {
                firstName: 'Bill',
                lastName: 'Nye',
                badgeNo: '12345678',
                rankCode: "DEPUTYSHERIFF",
                homeCourthouseId: testCourthouse.id
            }
        )
        done();
    });

    it('create should create return a new Leave', async () => {
        const endDate = moment().add(3, 'days').format();
        createdEntity = await api.CreateLeave({
            ...entityToCreate,
            endDate,
            isPartial: 0,
            sheriffId: testSheriff.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.sheriffId).toEqual(testSheriff.id);
        expect(createdEntity.startDate).toBeSameDate(entityToCreate.startDate);
        expect(createdEntity.endDate).toBeSameDate(endDate);
    });

    it('creating a partial leave should create return a new partial Leave', async () => {
        const startTime = moment().format();
        const endTime = moment().add(3, 'hours').format();
        createdEntity2 = await api.CreateLeave({
            ...entityToCreate,
            startTime,
            endTime,
            endDate: moment().format(),
            isPartial: 1,
            sheriffId: testSheriff.id
        });
        expect(createdEntity2).toBeDefined();
        expect(createdEntity2.id).toBeDefined();
        expect(createdEntity2.sheriffId).toEqual(testSheriff.id);
        expect(createdEntity2.startDate).toBeSameDate(entityToCreate.startDate);
        expect(createdEntity2.startTime).toBeSameTime(startTime);
        expect(createdEntity2.endTime).toBeSameTime(endTime);
    });


    it('get by id should return a Leave', async () => {
        const retrieved = await api.GetLeaveById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return a list of Leaves', async () => {
        const list = await api.GetLeaves();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(2);
    })
    
    it('update leave should return updated leave', async () => {
        const newLeaveSubCode = "ANNUAL";
        const updatedEntity = await api.UpdateLeave(createdEntity.id, {
            ...createdEntity,
            leaveSubCode: newLeaveSubCode
        } as Leave);
        expect(updatedEntity).toMatchObject({
            ...createdEntity, 
            leaveSubCode: newLeaveSubCode
        });
    });

    it('delete should delete Leave', async () => {
        await api.DeleteLeave(createdEntity.id);
        const retreived = await api.GetLeaveById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
    
}) 