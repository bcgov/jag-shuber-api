import ApiClient from '../ExtendedClient';
import { 
    JailRoleCode,
    OtherAssignCode,
    WorkSectionCode,
    SheriffRankCode 
} from '../models';
import TestData from './TestData';

const testData = new TestData();

const CodeShape: JailRoleCode | OtherAssignCode | WorkSectionCode | SheriffRankCode = {
    code: 'some string',
    description: 'some string'
}

describe('Codes API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = new ApiClient('http://localhost:3000/v1');
        done();
    });


    it('get jailRolesCodes should return list of Jail Role Codes', async () => {
        const list = await api.GetJailRoleCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(4);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get otherAssignCodes should return list of Other Assignment Codes', async () => {
        const list = await api.GetOtherAssignCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(5);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get workSectionCodes should return list of Work Section Codes', async () => {
        const list = await api.GetWorkSectionCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(4);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get sheriffRankCodes should return list of Sheriff Rank Codes', async () => {
        const list = await api.GetSheriffRankCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(7);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

}) 