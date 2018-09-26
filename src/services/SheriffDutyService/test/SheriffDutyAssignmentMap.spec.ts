import moment from 'moment';
import { SheriffDuty } from '../../../models/SheriffDuty';
import { Shift } from '../../../models/Shift';
import SheriffDutyAssignmentMap, { SheriffDutyWithAssignment } from '../SheriffDutyAssignmentMap';

describe('SheriffDutyMap', () => {
    const testSD: SheriffDuty = {
        dutyId: "d1",
        id: "sd1",
        startDateTime: moment().hour(10).format(),
        endDateTime: moment().hour(12).format()
    }
    const testSDWA: SheriffDutyWithAssignment = {
        assignmentId: "a1",
        ...testSD
    }
    const testShift: Shift = {
        locationId: "c1",
        id: "shift1",
        assignmentId: testSDWA.assignmentId,
        startDateTime: testSD.startDateTime,
        endDateTime: testSD.endDateTime
    }

    describe('Lookups and Mapping', () => {
        it('Should correctly map unassigned sheriff duties', () => {
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA
                }
            ];
            const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
            expect(assignMap.getSheriffDutiesBySheriff()).toEqual(expect.arrayContaining([testSD]));
            expect(assignMap.getSheriffDutiesBySheriff("s1")).toHaveLength(0);
        });

        it('Should correctly map assigned sheriff duties', () => {
            const sheriffDuty: SheriffDuty = {
                ...testSD,
                sheriffId: "s1"
            }
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...sheriffDuty,
                    assignmentId: "a1"
                }
            ];
            const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
            expect(assignMap.getSheriffDutiesBySheriff(sheriffDuty.sheriffId)).toEqual(expect.arrayContaining([sheriffDuty]));
            expect(assignMap.getSheriffDutiesBySheriff()).toHaveLength(0);
        });

        it('Should correctly map sheriff duties by assignment', () => {
            const sheriffDuty: SheriffDuty = {
                ...testSD,
                sheriffId: "s1"
            }
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...sheriffDuty,
                    assignmentId: testSDWA.assignmentId
                }
            ];
            const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
            expect(assignMap.getSheriffDutiesByAssignment(testSDWA.assignmentId)).toEqual(expect.arrayContaining([sheriffDuty]));
            expect(assignMap.getSheriffDutiesByAssignment("nonExistant")).toHaveLength(0);
        });
    });

    describe('wouldDoulbeBookSheriff', () => {
        it('should return true if assigning would result in double booking', () => {
            const sheriffId = "s1";
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA,
                    sheriffId
                }
            ];
            const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
            expect(assignMap.wouldDoubleBookSheriff({ ...testSD }, sheriffId)).toEqual(true);
        });

        it('should return false if assigning would not result in double booking', () => {
            const sheriffId = "s1";
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA,
                    sheriffId
                }
            ];
            const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
            expect(assignMap.wouldDoubleBookSheriff({
                ...testSD,
                startDateTime: moment(testSD.endDateTime).format(),
                endDateTime: moment(testSD.endDateTime).add(1, 'hour').format(),
            }, sheriffId)).toEqual(false);
        });
    });

    describe('assign', () => {
        it('Should alter internal sheriffSheriffDuty Map', () => {
            const assignMap = new SheriffDutyAssignmentMap([
                { ...testSDWA }
            ]);
            const newSheriffId = "newSheriff";
            expect(assignMap.getSheriffDutiesBySheriff(newSheriffId)).toHaveLength(0);
            expect(assignMap.getSheriffDutiesBySheriff()).toEqual(expect.arrayContaining([testSD]))
            assignMap.assignSheriff(testSD, newSheriffId);
            expect(assignMap.getSheriffDutiesBySheriff()).toHaveLength(0);
            expect(assignMap.getSheriffDutiesBySheriff(newSheriffId)).toEqual(
                expect.arrayContaining([{ ...testSD, sheriffId: newSheriffId }])
            );
            expect(assignMap.getSheriffDutiesByAssignment(testSDWA.assignmentId)).toEqual(
                expect.arrayContaining([{ ...testSD, sheriffId: newSheriffId }])
            );
        });

        it('Should alter add assigned sheriffDuty to updatedSheriffDuties', () => {
            const assignMap = new SheriffDutyAssignmentMap([
                { ...testSDWA }
            ]);
            const newSheriffId = "newSheriff";
            expect(assignMap.updatedSheriffDuties).toHaveLength(0);
            assignMap.assignSheriff(testSD, newSheriffId);
            expect(assignMap.updatedSheriffDuties).toEqual(
                expect.arrayContaining([{ ...testSD, sheriffId: newSheriffId }])
            );
        });

        it('Should not alter already assigned duties add assigned sheriffDuty to updatedSheriffDuties', () => {
            const oldSheriffId = "sheriff1"
            const assignMap = new SheriffDutyAssignmentMap([
                {
                    ...testSD,
                    assignmentId: "a1",
                    sheriffId: oldSheriffId
                }
            ]);
            const newSheriffId = "newSheriff";
            assignMap.assignSheriff(testSD, newSheriffId);
            expect(assignMap.updatedSheriffDuties).toHaveLength(0);
            expect(assignMap.getSheriffDutiesBySheriff(newSheriffId)).toHaveLength(0);
            expect(assignMap.getSheriffDutiesBySheriff(oldSheriffId)).toHaveLength(1);
        });
    });
});
