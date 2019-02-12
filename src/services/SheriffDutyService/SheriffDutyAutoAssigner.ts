import { Shift } from '../../models/Shift';
import moment from 'moment';
import { SheriffDuty } from '../../models/SheriffDuty';
import SheriffDutyAssignmentMap, { SheriffDutyWithAssignment } from './SheriffDutyAssignmentMap';
import { TimeRange } from '../../common/types';
import { isTimeWithin } from '../../common/TimeUtils';
import { start } from 'repl';

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

    static withinShiftSheriffDutyFilter(shift: Shift): (sheriffDuty: SheriffDuty) => boolean {
        return ({ startDateTime, endDateTime }) =>
        {
            const dutyRange = { startTime: startDateTime, endTime: endDateTime } as TimeRange;
            return isTimeWithin(shift.startDateTime, dutyRange, "[]") || isTimeWithin(shift.endDateTime, dutyRange, "[]")
        };
    }

    /**
     * Auto assigns sheriffs to SheriffDuties in memory based on shifts.
     *
     * @param {Shift[]} shifts
     * @returns {SheriffDuty[]} updated SheriffDuty models that need to be persisted to database
     * @memberof SheriffDutyAutoAssigner
     */
    autoAssignDuties(sheriffDuties: SheriffDutyWithAssignment[], shifts: Shift[]): { updatedSheriffDuties: SheriffDuty[], createdSheriffDuties: SheriffDuty[] } {
        const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
        shifts.forEach(shift => {
            const isSameAssignmentFilter = (sd:SheriffDuty)=>assignMap.getAssociatedAssignmentId(sd) === shift.assignmentId;
            const withinShiftFilter = SheriffDutyAutoAssigner.withinShiftSheriffDutyFilter(shift);
            const notDoubleBookedFilter = (sd:SheriffDuty)=>(!assignMap.wouldDoubleBookSheriff(sd,shift.sheriffId as string));
            const temporalProximitySort = SheriffDutyAutoAssigner.shiftRelativeSheriffDutySorter(shift);
            let sheriffDutyToAssign: SheriffDuty;
            do {
                sheriffDutyToAssign = assignMap.unassignedSheriffDuties
                    .filter(isSameAssignmentFilter)
                    .filter(withinShiftFilter)
                    .filter((sd)=>notDoubleBookedFilter(sd))
                    .sort(temporalProximitySort)[0]
                if (sheriffDutyToAssign) {
                    // if shift begins after the duty then create an assignment for the remaining time
                    if (shift.startDateTime > sheriffDutyToAssign.startDateTime)
                    {
                        assignMap.createSheriffDuty(sheriffDutyToAssign.dutyId!, sheriffDutyToAssign.startDateTime, shift.startDateTime);
                        sheriffDutyToAssign.startDateTime = shift.startDateTime;
                    }
                    
                    // if shift ends before the duty then create an assignment for the remaining time
                    if (shift.endDateTime < sheriffDutyToAssign.endDateTime)
                    {
                        assignMap.createSheriffDuty(sheriffDutyToAssign.dutyId!, shift.endDateTime, sheriffDutyToAssign.endDateTime);
                        sheriffDutyToAssign.endDateTime = shift.endDateTime;
                    }
                    assignMap.assignSheriff(sheriffDutyToAssign, shift.sheriffId as string)
                }
            } while (sheriffDutyToAssign != undefined)
        });
        return { 
            updatedSheriffDuties: assignMap.updatedSheriffDuties,
            createdSheriffDuties: assignMap.createdSheriffDuties 
        };
    }
}