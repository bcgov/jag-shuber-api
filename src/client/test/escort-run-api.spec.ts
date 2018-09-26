import ApiClient from '../ExtendedClient';
import { Location, Region, EscortRun } from '../models';
import TestUtils from './TestUtils';

describe('EscortRun API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "EscortRun Testing Region",
        code: TestUtils.randomString(5)
    }
    let testLocation: Location = {
        name: "EscortRun Testing Location",
        code: TestUtils.randomString(5)
    }

    const entityToCreate: EscortRun = {
        title: "EscortRun Testing Title",
        locationId: "ToReplace"
    };

    let createdEntity: EscortRun;

    beforeAll(async (done) => {
        await TestUtils.setupTestFixtures(async client=>{
            testRegion = await client.CreateRegion(testRegion);
            testLocation = await client.CreateLocation({ ...testLocation, regionId: testRegion.id });
        });
        api = TestUtils.getClientWithAuth();
        done();
    });

    it('create should return new EscortRun', async () => {
        createdEntity = await api.CreateEscortRun({
            ...entityToCreate,
            locationId: testLocation.id
        });
        expect(createdEntity).toBeDefined();
        expect(createdEntity.id).toBeDefined();
        expect(createdEntity.locationId).toEqual(testLocation.id);
        expect(createdEntity).toEqual({
            ...createdEntity,
            ...entityToCreate,
            locationId: testLocation.id
        });
    });

    it('get by id should return EscortRun', async () => {
        const retrieved = await api.GetEscortRunById(createdEntity.id);
        expect(retrieved).toMatchObject(createdEntity);
    });

    it('get List should return list of EscortRuns', async () => {
        const list = await api.GetEscortRuns();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
    });

    it('get list should return only those runs in location if specified', async () => {
        const secondTestLocation = { ...testLocation }
        delete secondTestLocation['id'];
        secondTestLocation.name = "Test Location 2";
        secondTestLocation.code= TestUtils.randomString(5);
        const secondLocation = await TestUtils.setupTestFixtures(client=> client.CreateLocation(secondTestLocation));
        const secondEntity = await api.CreateEscortRun({
            ...entityToCreate,
            locationId: secondLocation.id
        } as EscortRun);

        let list = await api.GetEscortRuns();
        expect(list.length).toEqual(2);

        list = await api.GetEscortRuns(secondLocation.id);
        expect(list.length).toEqual(1);
        expect(list[0]).toEqual(secondEntity);
    });


    it('update run should return updated EscortRun', async () => {
        const newTitle = "New EscortRun Title";
        const updatedEntity = await api.UpdateEscortRun(createdEntity.id, {
            ...createdEntity,
            title: newTitle
        } as EscortRun);
        expect(updatedEntity).toMatchObject({
            ...createdEntity,
            title: newTitle,
        });
    });

    it('delete should delete EscortRun', async () => {
        await api.DeleteEscortRun(createdEntity.id);
        const retreived = await api.GetEscortRunById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 