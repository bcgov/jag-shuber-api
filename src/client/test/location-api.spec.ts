import ApiClient from '../ExtendedClient';
import { Location, Region } from '../models';
import TestUtils from './TestUtils';

describe('Location API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Testing Region",
        code: TestUtils.randomString(5)
    }
    let createdLocation: Location;

    beforeAll(async (done) => {
        await TestUtils.setupTestFixtures(async client => {
            testRegion = await client.CreateRegion(testRegion);
        })      
        api = TestUtils.getClientWithAuth();
        done();
    });

    it('create should return new location', async () => {

        const newLocation: Location = {
            regionId: testRegion.id,
            name: "Test Location",
            code: TestUtils.randomString(5)
        }

        createdLocation = await api.CreateLocation(newLocation);
        expect(createdLocation).toBeDefined();
        expect(createdLocation.id).toBeDefined();
        expect(createdLocation).toEqual({
            ...newLocation,
            id: createdLocation.id,
            parentLocationId: null
        });
    });

    it('get List should return list of locations', async () => {
        const list = await api.GetLocations();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(1);
        // todo: check shape        
    });

    it('get by id should return location', async () => {
        const gotLocation = await api.GetLocationById(createdLocation.id as string);
        expect(gotLocation).toMatchObject(createdLocation);
    });

    it('update location should return updated location', async () => {
        const newName = "New Test Name"
        const gotEntity = await api.UpdateLocation(createdLocation.id as string, { ...createdLocation, name: newName });
        expect(gotEntity).toMatchObject({ ...createdLocation, name: newName });
    });

    it('delete should delete Location', async () => {
        await api.DeleteLocation(createdLocation.id as string);
        const retreived = await api.GetLocationById(createdLocation.id as string);
        expect(retreived).not.toBeDefined();
    });
}) 