import moment from 'moment';
import { SheriffDuty } from '../../../models/SheriffDuty';
import { Shift } from '../../../models/Shift';
import { SheriffDutyWithAssignment } from '../SheriffDutyAssignmentMap';
import SheriffDutyAutoAssigner from '../SheriffDutyAutoAssigner';

describe('SheriffDutyAutoAssigner', () => {
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
        courthouseId: "c1",
        id: "shift1",
        assignmentId: testSDWA.assignmentId,
        startDateTime: testSD.startDateTime,
        endDateTime: testSD.endDateTime
    }

    describe('shiftRelativeSheriffDutySorter', () => {
        const shift = {
            ...testShift
        }
        const sorter = SheriffDutyAutoAssigner.shiftRelativeSheriffDutySorter(shift);
        it('Should sort according to temporal proximity with positive start time deltas', () => {
            const closeSheriffDuty: SheriffDuty = {
                ...testSD,
                startDateTime: moment(shift.startDateTime).add(1, 'hour').format()
            }
            const farSheriffDuty: SheriffDuty = {
                ...testSD,
                startDateTime: moment(shift.startDateTime).add(1, 'hour').add(15, 'minute').format()
            }

            const sorted = [closeSheriffDuty, farSheriffDuty].sort(sorter);
            expect(sorted).toHaveLength(2);
            expect(sorted[0]).toBe(closeSheriffDuty);
            expect(sorted[1]).toBe(farSheriffDuty);
        });
        it('Should sort according to temporal proximity with negative start time deltas', () => {
            const closeSheriffDuty: SheriffDuty = {
                ...testSD,
                startDateTime: moment(shift.startDateTime).subtract(1, 'hour').format()
            }
            const farSheriffDuty: SheriffDuty = {
                ...testSD,
                startDateTime: moment(shift.startDateTime).subtract(1, 'hour').subtract(15, 'minute').format()
            }

            const sorted = [closeSheriffDuty, farSheriffDuty].sort(sorter);
            expect(sorted[0]).toBe(closeSheriffDuty);
            expect(sorted[1]).toBe(farSheriffDuty);
        });

    });

    describe('withinShiftSheriffDutyFilter', () => {
        const shift = {
            ...testShift
        }
        const filter = SheriffDutyAutoAssigner.withinShiftSheriffDutyFilter(shift);

        // Todo: DEFINE WHAT IT MEANS TO BE "WITHIN" A SHIFT
        it('Should filter out SheriffDuties that do not fall within shift', () => {
            const sameAsShift: SheriffDuty = {
                ...testSD,
                id: 'sameAsShift',
                startDateTime: moment(shift.startDateTime).format(),
                endDateTime: moment(shift.endDateTime).format()
            }
            const inside: SheriffDuty = {
                ...testSD,
                id: 'inside',
                startDateTime: moment(shift.startDateTime).add(15, 'minute').format(),
                endDateTime: moment(shift.endDateTime).subtract(15, 'minute').format()
            }
            const outside: SheriffDuty = {
                ...testSD,
                id: 'outside',
                startDateTime: moment(shift.endDateTime).format(),
                endDateTime: moment(shift.endDateTime).add(1, 'hour').format(),
            }

            const filtered = [sameAsShift, inside, outside].filter(filter);
            expect(filtered).toHaveLength(2);
            expect(filtered).not.toEqual(expect.arrayContaining([outside]));
            expect(filtered).toEqual(expect.arrayContaining([sameAsShift, inside]));
        });
    });

    describe('autoAssignShifts', () => {
        const blankTime: moment.MomentSetObject = {
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
        it('Should return a SheriffDuty that should be assigned to a shift', () => {
            const sheriffId = "Sherrif1";
            const shift: Shift = {
                ...testShift,
                sheriffId
            }
            const sheriffDuties = [
                {
                    ...testSDWA
                }
            ]
            const assigner = new SheriffDutyAutoAssigner();
            const assignedDuties = assigner.autoAssignDuties(sheriffDuties, [shift]);
            expect(assignedDuties).toHaveLength(1);
            expect(assignedDuties).toEqual(
                expect.arrayContaining([
                    { ...testSD, sheriffId }
                ])
            );
        });
        it('Should only assign sheriff duties that match assignment id', () => {
            const sheriffId = "Sherrif1";
            const shift: Shift = {
                ...testShift,
                sheriffId,
                assignmentId:"Some other assignment"
            }
            const sheriffDuties = [
                {
                    ...testSDWA
                }
            ]
            const assigner = new SheriffDutyAutoAssigner();
            const assignedDuties = assigner.autoAssignDuties(sheriffDuties, [shift]);
            expect(assignedDuties).toHaveLength(0);
        });

        it('Should auto assign multiple sheriffDuties to same sheriff if they dont overlap', () => {
            const sheriffId = "testSheriff";
            // 9-5 Shift
            const shift: Shift = {
                ...testShift,
                sheriffId,
                startDateTime: moment().format(),
                endDateTime: moment().add(9, 'hour').format()
            }
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA,
                    id: "sd1",
                    startDateTime: moment(shift.startDateTime).format(),
                    endDateTime: moment(shift.startDateTime).add(3, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd2",
                    startDateTime: moment(shift.startDateTime).add(3, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(6, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd3",
                    startDateTime: moment(shift.startDateTime).add(6, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(9, 'hour').format()
                }
            ];
            const assigner = new SheriffDutyAutoAssigner();
            const updates = assigner.autoAssignDuties(sheriffDuties, [shift]);
            expect(updates).toHaveLength(3);
            // Expect the updated records to be the same as the input just with the sheriffId set
            expect(updates).toEqual(expect.arrayContaining(
                sheriffDuties.map(({ assignmentId, ...sd }) => ({ ...sd, sheriffId })))
            );
        });

        it('Should auto assign multiple but only if they arent already assigned', () => {
            const sheriffId = "testSheriff";
            // 9-5 Shift
            const shift: Shift = {
                ...testShift,
                sheriffId,
                startDateTime: moment().format(),
                endDateTime: moment().add(9, 'hour').format()
            }
            // Pass in sheriff duty that is already assigned to sheriff
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA,
                    sheriffId,
                    id: "sd1",
                    startDateTime: moment(shift.startDateTime).format(),
                    endDateTime: moment(shift.startDateTime).add(3, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd2",
                    startDateTime: moment(shift.startDateTime).add(3, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(6, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd3",
                    startDateTime: moment(shift.startDateTime).add(6, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(9, 'hour').format()
                }
            ];
            const assigner = new SheriffDutyAutoAssigner();
            const updates = assigner.autoAssignDuties(sheriffDuties, [shift]);
            expect(updates).toHaveLength(2);
            // Expect the updated records to be the same as the input just with the sheriffId set
            expect(updates).toEqual(expect.arrayContaining(
                sheriffDuties.map(({ assignmentId, ...sd }) => ({ ...sd, sheriffId }))
                    .filter(sd => sd.id !== "sd1")
            ));
        });

        it('Should auto assign multiple but only if they dont overlap', () => {
            const sheriffId = "testSheriff";
            // 9-5 Shift
            const shift: Shift = {
                ...testShift,
                sheriffId,
                startDateTime: moment().format(),
                endDateTime: moment().add(9, 'hour').format()
            }
            // Pass in sheriff duty that is already assigned to sheriff
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...testSDWA,
                    id: "sd1",
                    startDateTime: moment(shift.startDateTime).format(),
                    endDateTime: moment(shift.startDateTime).add(3, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd2",
                    startDateTime: moment(shift.startDateTime).add(2, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(6, 'hour').format()
                },
                {
                    ...testSDWA,
                    id: "sd3",
                    startDateTime: moment(shift.startDateTime).add(6, 'hour').format(),
                    endDateTime: moment(shift.startDateTime).add(9, 'hour').format()
                }
            ];
            const assigner = new SheriffDutyAutoAssigner();
            const updates = assigner.autoAssignDuties(sheriffDuties, [shift]);
            expect(updates).toHaveLength(2);
            // Expect the updated records to be the same as the input just with the sheriffId set
            expect(updates).toEqual(expect.arrayContaining(
                sheriffDuties.map(({ assignmentId, ...sd }) => ({ ...sd, sheriffId }))
                    .filter(sd => sd.id !== "sd2")
            ));
        });

        it('Should auto assign for multiple shifts to multiple duties', () => {
            const sheriffId1 = "testSheriff1";
            const sheriffId2 = "testSheriff2";
            // 9-5 Shift
            const shift1: Shift = {
                ...testShift,
                sheriffId: sheriffId1,
                startDateTime: moment().format(),
                endDateTime: moment().add(9, 'hour').format()
            }
            const shift2: Shift = {
                ...shift1,
                assignmentId: "assignment2",
                sheriffId: sheriffId2
            }

            const sd1: SheriffDuty = {
                ...testSD,
                id: "sd1",
                startDateTime: moment(shift1.startDateTime).format(),
                endDateTime: moment(shift1.startDateTime).add(3, 'hour').format()
            }

            const sd2: SheriffDuty = {
                ...testSD,
                id: "sd2",
                startDateTime: moment(shift1.startDateTime).format(),
                endDateTime: moment(shift1.startDateTime).add(3, 'hour').format()
            }


            // Pass in sheriff duty that is already assigned to sheriff
            const sheriffDuties: SheriffDutyWithAssignment[] = [
                {
                    ...sd1,
                    assignmentId: shift1.assignmentId
                },
                {
                    ...sd2,
                    assignmentId: shift2.assignmentId
                }
            ];
            const assigner = new SheriffDutyAutoAssigner();
            const updates = assigner.autoAssignDuties(sheriffDuties, [shift1, shift2]);
            expect(updates).toHaveLength(2);
            // Expect the updated records to be the same as the input just with the sheriffId set
            expect(updates).toEqual(expect.arrayContaining(
                [
                    { ...sd1, sheriffId: shift1.sheriffId },
                    { ...sd2, sheriffId: shift2.sheriffId }
                ]
            ));
        });
    });
});