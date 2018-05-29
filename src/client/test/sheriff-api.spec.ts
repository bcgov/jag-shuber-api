import ApiClient from '../ExtendedClient';
import { Courthouse, Region, Sheriff } from '../models';
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
        let testCourthouse: Courthouse = {
            name: "Sheriff Testing Courthouse",
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

        beforeAll(async (done) => {
            api = TestUtils.getClient();
            testRegion = await api.CreateRegion(testRegion);
            testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
            done();
        });

        it('create should return new sheriff', async () => {
            createdSheriff = await api.CreateSheriff({
                ...sheriffToCreate,
                homeCourthouseId: testCourthouse.id
            });
            expect(createdSheriff).toBeDefined();
            expect(createdSheriff.id).toBeDefined();
            expect(createdSheriff.homeCourthouseId).toEqual(testCourthouse.id);
            expect(createdSheriff).toEqual({
                ...createdSheriff,
                ...sheriffToCreate,
                homeCourthouseId: testCourthouse.id
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

        it('get List should return only those Sheriffs in courthouse if specified', async () => {
            const secondTestCourthouse = { ...testCourthouse }
            delete secondTestCourthouse['id'];
            secondTestCourthouse.name = "Test Courthouse 2";
            secondTestCourthouse.code= TestUtils.randomString(5);
            const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
            const secondSheriff = await api.CreateSheriff({
                ...sheriffToCreate,
                firstName: "William",
                badgeNo: "23456",
                homeCourthouseId: secondCourthouse.id
            });

            let list = await api.GetSheriffs();
            expect(list.length).toEqual(2);

            list = await api.GetSheriffs(secondCourthouse.id);
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
                currentCourthouseId:testCourthouse.id
            });
            expect(gotEntity).toMatchObject({
                ...createdSheriff,
                firstName: newName,
                badgeNo: newBadgeNo,
                alias:newAlias,
                currentCourthouseId:testCourthouse.id
            });
        });

        it('delete should delete Sheriff', async () => {
            await api.DeleteSheriff(createdSheriff.id);
            const retreived = await api.GetSheriffById(createdSheriff.id);
            expect(retreived).not.toBeDefined();
        });    
}) 