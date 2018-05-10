import ApiClient from '../ExtendedClient';
import { Courthouse, Region, Run } from '../models';
import TestData from './TestData';

const testData = new TestData();

describe('Run API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Run Testing Region",
        code: TestData.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Run Testing Courthouse",
        code: TestData.randomString(5)
    }

    const entityToCreate: Run = {
        title: "Run Testing Title",
        courthouseId: "ToReplace"
    };

    let createdEntity: Run;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        await testData.clearDatabase();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        done();
    });

    it('create should return new Run', async () => {
        createdEntity = await api.CreateRun({
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

    it('get by id should return Run', async () => {
        const retrieved = await api.GetRunById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Runs', async () => {
        const list = await api.GetRuns();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should return only those runs in courthouse if specified', async () => {
        const secondTestCourthouse = { ...testCourthouse }
        delete secondTestCourthouse['id'];
        secondTestCourthouse.name = "Test Courthouse 2";
        secondTestCourthouse.code= TestData.randomString(5);
        const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
        const secondEntity = await api.CreateRun({
            ...entityToCreate,
            courthouseId: secondCourthouse.id
        } as Run);

        let list = await api.GetRuns();
        expect(list.length).toEqual(2);

        list = await api.GetRuns(secondCourthouse.id);
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(secondEntity);
    });


    it('update run should return updated Run', async () => {
        const newTitle = "New Run Title";
        const updatedEntity = await api.UpdateRun(createdEntity.id, {
            ...createdEntity,
            title: newTitle
        } as Run);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            title: newTitle,
        });
    });

    it('delete should delete Run', async () => {
        await api.DeleteRun(createdEntity.id);
        const retreived = await api.GetRunById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 