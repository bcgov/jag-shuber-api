import ApiClient from '../ExtendedClient';
import { 
    JailRoleCode,
    OtherAssignCode,
    WorkSectionCode,
    SheriffRankCode,
    LeaveCancelReasonCode,
    LeaveCode, 
    CourtRoleCode 
} from '../models';
import TestUtils from './TestUtils';

const CodeShape: JailRoleCode | OtherAssignCode | WorkSectionCode | SheriffRankCode | LeaveCancelReasonCode | LeaveCode | CourtRoleCode = {
    code: 'some string',
    description: 'some string'
}

describe('Codes API', () => {
    let api: ApiClient;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        done();
    });

    it('get jailRolesCodes should return list of Jail Role Codes', async () => {
        const list = await api.GetJailRoleCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(7);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get otherAssignCodes should return list of Other Assignment Codes', async () => {
        const list = await api.GetOtherAssignCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(12);
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
    
    it('get leaveCancelTypes should return list of Leave Cancel Reason Codes', async () => {
        const list = await api.GetLeaveCancelReasonCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(3);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get leaveTypes should return list of Leave Type Codes', async () => {
        const list = await api.GetLeaveTypes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(2);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });

    it('get courtRoleCodes should return list of Court Role Codes', async () => {
        const list = await api.GetCourtRoleCodes();
        expect(list).toBeDefined();
        expect(Array.isArray(list)).toBeTruthy();
        expect(list.length).toEqual(5);
        list.forEach(c => {
            expect(c).toMatchShapeOf(CodeShape);
        })
    });
}) 