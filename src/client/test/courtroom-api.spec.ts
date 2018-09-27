import ApiClient from '../ExtendedClient';
import { Location, Courtroom, Region } from '../models';
import TestUtils from './TestUtils';

describe('Courtroom API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Courtroom Testing Region",
        code: TestUtils.randomString(5)
    }
    let testLocation: Location = {
        name: "Courtroom Testing Location",
        code: TestUtils.randomString(5)
    }

    const entityToCreate: Courtroom = {
        code: TestUtils.randomString(5),
        name: "Test Courtroom",
        locationId: "ToReplace"
    };

    let createdEntity: Courtroom;

    beforeAll(async (done) => {
        await TestUtils.setupTestFixtures(async client=>{
            testRegion = await client.CreateRegion(testRegion);
            testLocation = await client.CreateLocation({ ...testLocation, regionId: testRegion.id });
        });
        api = TestUtils.getClientWithAuth();
        done();
    });

    it('create should return new Courtroom', async () => {
        createdEntity = await api.CreateCourtroom({
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

    it('get list should return only those Courtrooms in location if specified', async () => {
        const secondTestLocation = { ...testLocation }
        delete secondTestLocation['id'];
        secondTestLocation.name = "Test Location 2";
        secondTestLocation.code= TestUtils.randomString(5);
        let secondLocation:Location;        
        await TestUtils.setupTestFixtures(async client=>{
            secondLocation = await client.CreateLocation(secondTestLocation);
        })
        
        const secondEntity = await api.CreateCourtroom({
            ...entityToCreate,
            name: "second courtroom",
            locationId: secondLocation.id
        } as Courtroom);

        let list = await api.GetCourtrooms();
        expect(list.length).toEqual(2);

        list = await api.GetCourtrooms(secondLocation.id);
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