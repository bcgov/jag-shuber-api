import ApiClient from '../ExtendedClient';
import { Region } from '../models';
import TestData from './TestData';

const testData = new TestData();

describe('Courtroom API', () => {
    let api: ApiClient;

    const regionShape: Region = {
        code: 'SomeCode',
        name: 'Some Name',
        id: 'some id'
    }
    let createdRegion: Region;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        await testData.clearDatabase();
        done();
    });

    it('create should return new region', async () => {
        const toCreate: Region = {
            name: 'Test Region',
            code: TestData.randomString(5)
        }
        createdRegion = await api.CreateRegion(toCreate);
        expect(createdRegion).toBeDefined();
        expect(createdRegion).toMatchShapeOf(regionShape);
    });

    it('get List should return list of regions', async () => {
        const list = await api.GetRegions();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        expect(list[0]).toMatchShapeOf(regionShape);
    });

    it('get by id should return region', async () => {
        const gotRegion = await api.GetRegionById(createdRegion.id);
        expect(gotRegion).toMatchObject(createdRegion);
    });

    it('update region should return updated region', async () => {
        const newName = "New Test Region"
        const gotRegion = await api.UpdateRegion(createdRegion.id, { ...createdRegion, name: newName });
        expect(gotRegion).toMatchObject({ ...createdRegion, name: newName });
    });

    it('delete should delete Region', async () => {
        await api.DeleteRegion(createdRegion.id);
        const retreived = await api.GetRegionById(createdRegion.id);
        expect(retreived).not.toBeDefined();
    });
}) 