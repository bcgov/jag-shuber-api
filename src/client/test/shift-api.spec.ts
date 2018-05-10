import ApiClient from '../ExtendedClient';
import { Courthouse, Region, Shift } from '../models';
import TestData from './TestData';
import moment from 'moment';

const testData = new TestData();

describe('Shift API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Shift Testing Region",
        code: TestData.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Shift Testing Courthouse",
        code: TestData.randomString(5)
    }

    const entityToCreate: Shift = {
        courthouseId: "To Replace",
        workSectionCode: "COURTS",
        startDateTime: moment().toISOString(),
        endDateTime: moment().add(1, 'hour').toISOString()
    };

    let createdEntity: Shift;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        await testData.clearDatabase();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        done();
    });

    it('create should return new Shift', async () => {
        createdEntity = await api.CreateShift({
            ...entityToCreate,
            courthouseId: testCourthouse.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.courthouseId).toEqual(testCourthouse.id);
        expect(createdEntity).toEqual({
            ...createdEntity,
            ...entityToCreate,
            courthouseId: testCourthouse.id
        });
    });

    it('get by id should return Shift', async () => {
        const retrieved = await api.GetShiftById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Shifts', async () => {
        const list = await api.GetShifts();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should return only those shifts in courthouse if specified', async () => {
        const secondTestCourthouse = { ...testCourthouse }
        delete secondTestCourthouse['id'];
        secondTestCourthouse.name = "Test Courthouse 2";
        secondTestCourthouse.code = "TCH32";
        const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
        const secondEntity = await api.CreateShift({
            ...entityToCreate,
            courthouseId: secondCourthouse.id
        } as Shift);

        let list = await api.GetShifts();
        expect(list.length).toEqual(2);

        list = await api.GetShifts(secondCourthouse.id);
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(secondEntity);
    });


    it('update shift should return updated Shift', async () => {
        const newEndDateTime = moment().add(4, 'hour').toISOString()
        const updatedEntity = await api.UpdateShift(createdEntity.id, {
            ...createdEntity,
            endDateTime: newEndDateTime
        } as Shift);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            endDateTime: newEndDateTime,
        });
    });

    it('removing a shifts work section via update should return an updated Shift', async () => {
        const newWorkSection = "";
        const updatedEntity = await api.UpdateShift(createdEntity.id, {
            ...createdEntity,
            workSectionCode: newWorkSection
        } as Shift);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            workSectionCode: newWorkSection,
        });
    });

    it('delete should delete Shift', async () => {
        await api.DeleteShift(createdEntity.id);
        const retreived = await api.GetShiftById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 