import ApiClient from '../ExtendedClient';
import { Courthouse, Region } from '../models';
import TestUtils from './TestUtils';

describe('Courtroom API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Testing Region",
        code: TestUtils.randomString(5)
    }
    let createdCourthouse: Courthouse;

    beforeAll(async (done) => {
        await TestUtils.setupTestFixtures(async client => {
            testRegion = await client.CreateRegion(testRegion);
        })      
        api = TestUtils.getClientWithAuth();
        done();
    });

    it('create should return new courthouse', async () => {

        const newCourthouse: Courthouse = {
            regionId: testRegion.id,
            name: "Test Courthouse",
            code: TestUtils.randomString(5)
        }

        createdCourthouse = await api.CreateCourthouse(newCourthouse);
        expect(createdCourthouse).toBeDefined();
        expect(createdCourthouse.id).toBeDefined();
        expect(createdCourthouse).toEqual({
            ...newCourthouse,
            id: createdCourthouse.id,
            location: null,
            parentCourthouseId: null
        });
    });

    it('get List should return list of courthouses', async () => {
        const list = await api.GetCourthouses();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
        // todo: check shape        
    });

    it('get by id should return courthouse', async () => {
        const gotCourthouse = await api.GetCourthouseById(createdCourthouse.id as string);
        expect(gotCourthouse).toMatchObject(createdCourthouse);
    });

    it('update courthouse should return updated courthouse', async () => {
        const newName = "New Test Name"
        const gotEntity = await api.UpdateCourthouse(createdCourthouse.id as string, { ...createdCourthouse, name: newName });
        expect(gotEntity).toMatchObject({ ...createdCourthouse, name: newName });
    });

    it('delete should delete Courthouse', async () => {
        await api.DeleteCourthouse(createdCourthouse.id as string);
        const retreived = await api.GetCourthouseById(createdCourthouse.id as string);
        expect(retreived).not.toBeDefined();
    });
}) 