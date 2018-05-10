import ApiClient from '../ExtendedClient';
import { Courthouse, Courtroom, Region } from '../models';
import TestData from './TestData';

const testData = new TestData();

describe('Courtroom API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Courtroom Testing Region",
        code: TestData.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Courtroom Testing Courthouse",
        code: TestData.randomString(5)
    }

    const entityToCreate: Courtroom = {
        code: TestData.randomString(5),
        name: "Test Courtroom",
        courthouseId: "ToReplace"
    };

    let createdEntity: Courtroom;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        await testData.clearDatabase();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        done();
    });

    it('create should return new Courtroom', async () => {
        createdEntity = await api.CreateCourtroom({
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

    it('get by id should return Courtroom', async () => {
        const retrieved = await api.GetCourtroomById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of Courtrooms', async () => {
        const list = await api.GetCourtrooms();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should return only those Courtrooms in courthouse if specified', async () => {
        const secondTestCourthouse = { ...testCourthouse }
        delete secondTestCourthouse['id'];
        secondTestCourthouse.name = "Test Courthouse 2";
        secondTestCourthouse.code= TestData.randomString(5);
        const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
        const secondEntity = await api.CreateCourtroom({
            ...entityToCreate,
            name: "second courtroom",
            courthouseId: secondCourthouse.id
        } as Courtroom);

        let list = await api.GetCourtrooms();
        expect(list.length).toEqual(2);

        list = await api.GetCourtrooms(secondCourthouse.id);
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(secondEntity);
    });


    it('update Courtroom should return updated Courtroom', async () => {
        const newName = "New Courtroom Name";
        const updatedEntity = await api.UpdateCourtroom(createdEntity.id, {
            ...createdEntity,
            name: newName
        } as Courtroom);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            name: newName,
        });
    });

    it('delete should delete Courtroom', async () => {
        await api.DeleteCourtroom(createdEntity.id);
        const retreived = await api.GetCourtroomById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 