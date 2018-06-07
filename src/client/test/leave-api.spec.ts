import ApiClient from '../ExtendedClient';
import { Region, Leave, Sheriff } from '../models';
import TestUtils from './TestUtils';

describe('Leave API', () => {
    let api: ApiClient;

    const leaveShape: Leave = {
        id:'some id',
        sheriffId:'some string',
        leaveType: 'some string',
        startDate: 'date string',
        endDate: 'date string'
    }
    let createdEntity: Leave;
    let testSheriff: Sheriff;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testSheriff = 
        done();
    });

    it('create should return new Leave', async () => {
        throw "to test"
    });

    it('get List should return list of Leaves for all courthouses', async () => {
        throw "to test"
    });

    it('get List should return list of Leaves based on courthouse if specified', async () => {
        throw "to test"
    });

    it('get by id should return leave', async () => {
        throw "to test"
    });

    it('update leave should return updated leave', async () => {
        throw "to test"
    });

    it('cancel leave should set cancel date and return updated leave', async () => {
        throw "to test"
    });

    it('delete should delete Region', async () => {
        await api.DeleteRegion(createdEntity.id);
        const retreived = await api.GetRegionById(createdEntity.id);
        expect(retreived).not.toBeDefined();
    });
}) 