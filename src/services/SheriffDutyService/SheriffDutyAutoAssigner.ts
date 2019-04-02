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

    /**
     * Auto assigns sheriffs to SheriffDuties in memory based on shifts.
     *
     * @param {Shift[]} shifts
     * @returns {SheriffDuty[]} updated SheriffDuty models that need to be persisted to database
     * @memberof SheriffDutyAutoAssigner
     */
    autoAssignDuties(sheriffDuties: SheriffDutyWithAssignment[], shifts: Shift[]): { updatedSheriffDuties: SheriffDuty[], createdSheriffDuties: SheriffDuty[] } {
        const assignMap = new SheriffDutyAssignmentMap(sheriffDuties);
        
        assignMap.unassignedSheriffDuties.forEach(sheriffDutyToAssign => {
            const shift: Shift = shifts
                .filter((shift: Shift) => 
                    // Filter Same assigment
                    assignMap.getAssociatedAssignmentId(sheriffDutyToAssign) === shift.assignmentId)
                .filter((shift: Shift) => {
                    // Filter Shift within Duty time range
                    const shiftRange = { startTime: shift.startDateTime, endTime: shift.endDateTime } as TimeRange;
                    return isTimeWithin(sheriffDutyToAssign.startDateTime, shiftRange, "()") || isTimeWithin(sheriffDutyToAssign.endDateTime, shiftRange, "()")
                })
                .filter((shift:Shift) => 
                    // Filter double book sheriff
                    (!assignMap.wouldDoubleBookSheriff(sheriffDutyToAssign, shift.sheriffId as string)))
                .sort((shiftA:Shift, shiftB:Shift) => {
                    // static shiftRelativeSheriffDutySorter(duty: SheriffDuty): (a: Shift, b: Shift) => number {
                    const start = moment(sheriffDutyToAssign.startDateTime);
                    return Math.abs(start.diff(moment(shiftA.startDateTime))) - Math.abs(start.diff(moment(shiftB.startDateTime)));
                })[0]
            
            if (shift) {
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
        });
        return { 
            updatedSheriffDuties: assignMap.updatedSheriffDuties,
            createdSheriffDuties: assignMap.createdSheriffDuties 
        };
    }
}