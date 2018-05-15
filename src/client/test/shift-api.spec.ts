import ApiClient from '../ExtendedClient';
import { Courthouse, Region, Shift } from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

const testData = new TestUtils();

describe('Shift API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Shift Testing Region",
        code: TestUtils.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Shift Testing Courthouse",
        code: TestUtils.randomString(5)
    }

    const entityToCreate: Shift = {
        courthouseId: "To Replace",
        workSectionId: "COURTS",
        startDateTime: moment().toISOString(),
        endDateTime: moment().add(1, 'hour').toISOString()
    };

    let createdEntity: Shift;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
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


    // ####################################################
    // ################  CURRENTLY BROKEN  ################
    // ####################################################
    it.skip('removing a shifts work section via update should return an updated Shift', async () => {
        const newWorkSection = null;
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