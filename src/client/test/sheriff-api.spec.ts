import ApiClient from '../ExtendedClient';
import { Location, Region, Sheriff, GenderCode } from '../models';
import TestUtils from './TestUtils';

const SheriffShape: Sheriff = {
    id: 'string',
    badgeNo: 'string',
    firstName: 'string',
    lastName: 'string',
    imageUrl: 'string',
}

const SheriffShapeNoImage: Sheriff = {
    id: 'string',
    badgeNo: 'string',
    firstName: 'string',
    lastName: 'string',
}

const sheriffList: Sheriff[] = [
    SheriffShape,
    SheriffShapeNoImage
]

describe('Sheriff API', () => {
    let api: ApiClient;

        let testRegion: Region = {
            name: "Sheriff Testing Region",
            code: TestUtils.randomString(5)
        }
        let testLocation: Location = {
            name: "Sheriff Testing Location",
            code: TestUtils.randomString(5)
        }

        const sheriffToCreate: Sheriff = {
            firstName: 'Bill',
            lastName: 'Nye',
            badgeNo: '12345678',
            rankCode: "DEPUTYSHERIFF",
            alias:'Bravo Charlie'
        };

        let createdSheriff: Sheriff;

        let testGenderCode: GenderCode;

        beforeAll(async (done) => {
            await TestUtils.setupTestFixtures(async client=>{
                testRegion = await client.CreateRegion(testRegion);
                testLocation = await client.CreateLocation({ ...testLocation, regionId: testRegion.id });
                testGenderCode = (await client.GetGenderCodes())[0];
            });
            api = TestUtils.getClientWithAuth();
            done();
        });

        it('create should return new sheriff', async () => {
            createdSheriff = await api.CreateSheriff({
                ...sheriffToCreate,
                homeLocationId: testLocation.id
            });
            expect(createdSheriff).toBeDefined();
            expect(createdSheriff.id).toBeDefined();
            expect(createdSheriff.homeLocationId).toEqual(testLocation.id);
            expect(createdSheriff).toEqual({
                ...createdSheriff,
                ...sheriffToCreate,
                homeLocationId: testLocation.id
            });

        });

        it('get by id should return Sheriff', async () => {
            const retrieved = await api.GetSheriffById(createdSheriff.id);
            expect(retrieved).toMatchObject(createdSheriff);
        });

        it('get List should return list of Sheriffs', async () => {
            const list = await api.GetSheriffs();
            expect(list).toBeDefined();
            expect(Array.isArray(list)).toBeTruthy();
            expect(list.length).toEqual(1);
        });

        it('get List should return only those Sheriffs in location if specified', async () => {
            const secondTestLocation = { ...testLocation }
            delete secondTestLocation['id'];
            secondTestLocation.name = "Test Location 2";
            secondTestLocation.code= TestUtils.randomString(5);
            const secondLocation = await TestUtils.setupTestFixtures(client=>client.CreateLocation(secondTestLocation));
            const secondSheriff = await api.CreateSheriff({
                ...sheriffToCreate,
                firstName: "William",
                badgeNo: "23456",
                homeLocationId: secondLocation.id
            });

            let list = await api.GetSheriffs();
            expect(list.length).toEqual(2);

            list = await api.GetSheriffs(secondLocation.id);
            expect(list.length).toEqual(1);
            expect(list[0]).toEqual(secondSheriff);
        });


        it('update Sheriff should return updated Sheriff', async () => {
            const newName = "Bruce";
            const newBadgeNo = "32345";
            const newAlias = "Spruce Bruce";
            const gotEntity = await api.UpdateSheriff(createdSheriff.id, {
                ...createdSheriff,
                firstName: newName,
                badgeNo: newBadgeNo,
                alias:newAlias,
                currentLocationId:testLocation.id,
                genderCode: testGenderCode.code
            });
            expect(gotEntity).toMatchObject({
                ...createdSheriff,
                firstName: newName,
                badgeNo: newBadgeNo,
                alias:newAlias,
                currentLocationId:testLocation.id,
                genderCode: testGenderCode.code
            });
        });

        it('delete should delete Sheriff', async () => {
            await api.DeleteSheriff(createdSheriff.id);
            const retreived = await api.GetSheriffById(createdSheriff.id);
            expect(retreived).not.toBeDefined();
        });    
}) 