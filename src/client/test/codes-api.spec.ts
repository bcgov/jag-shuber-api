import ApiClient from '../ExtendedClient';
import { 
    JailRoleCode,
    OtherAssignCode,
    WorkSectionCode,
    SheriffRankCode,
    LeaveCancelReasonCode,
    LeaveCode, 
    CourtRoleCode,
    GenderCode,
    LeaveSubCode
} from '../models';
import TestUtils from './TestUtils';

const CodeShape: 
    JailRoleCode | OtherAssignCode | WorkSectionCode | SheriffRankCode | 
    LeaveCancelReasonCode | LeaveCode | CourtRoleCode | GenderCode = {
    code: 'some string',
    description: 'some string'
}

const SubCodeShape: LeaveSubCode = {
    code: 'some string',
    subCode: 'some string',
    description: 'some string'
}
describe('Codes API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = TestUtils.getClientWithAuth();
        done();
    });

    it('get jailRolesCodes should return list of Jail Role Codes', async () => {
        const list = await api.GetJailRoleCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get otherAssignCodes should return list of Other Assignment Codes', async () => {
        const list = await api.GetOtherAssignCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get workSectionCodes should return list of Work Section Codes', async () => {
        const list = await api.GetWorkSectionCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get sheriffRankCodes should return list of Sheriff Rank Codes', async () => {
        const list = await api.GetSheriffRankCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });
    
    it('get leaveCancelTypes should return list of Leave Cancel Reason Codes', async () => {
        const list = await api.GetLeaveCancelReasonCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get leaveTypes should return list of Leave Type Codes', async () => {
        const list = await api.GetLeaveTypes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get courtRoleCodes should return list of Court Role Codes', async () => {
        const list = await api.GetCourtRoleCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get genderCodes should return a list of Gender Codes', async () => {
        const list = await api.GetGenderCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get leave subcodes should return list of Leave Type Sub Codes', async () => {
        const list = await api.GetLeaveSubCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toBeGreaterThan(0);
        list.forEach(c => {
            expect(c).toMatchShapeOf(SubCodeShape);
        })
    });
}) 