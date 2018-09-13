import { Shift } from '../../models/Shift';
import moment from 'moment';
import { SheriffDuty } from '../../models/SheriffDuty';
import SheriffDutyAssignmentMap, { SheriffDutyWithAssignment } from './SheriffDutyAssignmentMap';
import { TimeRange } from '../../common/types';
import { isTimeWithin } from '../../common/TimeUtils';

/**
 * This is a internal class that is here to make the AutoAssign Heuristic
 * more testable and isolated to prevent the state / implementation from bleeding
 * into the SheriffDutyService.
 * @class SheriffDutyAutoAssigner
 */
export default class SheriffDutyAutoAssigner {

    static shiftRelativeSheriffDutySorter(shift: Shift): (a: SheriffDuty, b: SheriffDuty) => number {
        const shiftStart = moment(shift.startDateTime);
        return (a, b) => Math.abs(shiftStart.diff(moment(a.startDateTime))) - Math.abs(shiftStart.diff(moment(b.startDateTime)));
    }

    static withinShiftSheriffDutyFilter({ startDateTime, endDateTime }: Shift): (sheriffDuty: SheriffDuty) => boolean {
        const shiftRange: TimeRange = {
            startTime: startDateTime,
            endTime: endDateTime
        }
        return ({ startDateTime, endDateTime }) =>
            isTimeWithin(startDateTime, shiftRange, "[]") && isTimeWithin(endDateTime, shiftRange, "[]");
    }

    /**
     * Auto assigns sheriffs to SheriffDuties in memory based on shifts.
     *
     * @param {Shift[]} shifts
     * @returns {SheriffDuty[]} updated SheriffDuty models that need to be persisted to database
     * @memberof SheriffDutyAutoAssigner
     */
    autoAssignDuties(sheriffDuties: SheriffDutyWithAssignment[], shifts: Shift[]): SheriffDuty[] {
        const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
        shifts.forEach(shift => {
            const withinShiftFilter = SheriffDutyAutoAssigner.withinShiftSheriffDutyFilter(shift);
            const notDoubleBookedFilter = (sd:SheriffDuty)=>(!assignMap.wouldDoubleBookSheriff(sd,shift.sheriffId as string));
            const temporalProximitySort = SheriffDutyAutoAssigner.shiftRelativeSheriffDutySorter(shift);
            let sheriffDutyToAssign: SheriffDuty;
            do {
                sheriffDutyToAssign = assignMap.unassignedSheriffDuties
                    .filter(withinShiftFilter)
                    .filter((sd)=>notDoubleBookedFilter(sd))
                    .sort(temporalProximitySort)[0]
                if (sheriffDutyToAssign) {
                    assignMap.assignSheriff(sheriffDutyToAssign, shift.sheriffId as string)
                }
            } while (sheriffDutyToAssign != undefined)
        });
        return assignMap.updatedSheriffDuties;
    }
}