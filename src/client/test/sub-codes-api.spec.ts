import ApiClient from '../ExtendedClient';
import { 
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';

const SubCodeShape: LeaveSubCode = {
    code: 'some string',
    subCode: 'some string',
    description: 'some string'
}

describe('Codes API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        done();
    });

    it('get leaveTypes should return list of Leave Type Codes', async () => {
        const list = await api.GetLeaveSubCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        list.forEach(c => {
            expect(c).toMatchShapeOf(SubCodeShape);
        })
    });

}) 