import { SheriffDuty } from '../../models/SheriffDuty';
import { TimeRange } from '../../common/types';
import { doTimeRangesOverlap } from '../../common/TimeUtils';
import moment from 'moment';

// Create a type to represent the combination of sheriffDuty and assignmentId
export type SheriffDutyWithAssignment = SheriffDuty & { assignmentId: string };

export default class SheriffDutyAssignmentMap {
    private static UNASSIGNED_SHERIFF_DUTIES = "Unassigned Sheriff Duties";
    private sheriffDutyLookup: { [key: string]: SheriffDuty } = {};
    private sheriffLookup: { [key: string]: SheriffDuty[] } = {}
    private assignmentLookup: { [key: string]: SheriffDuty[] } = {}
    private reverseAssignmentLookup: { [key: string]: string } = {};
    private _updatedSheriffDuties: SheriffDuty[] = [];
    private _createdSheriffDuties: SheriffDuty[] = [];

    constructor(allSheriffDuties: SheriffDutyWithAssignment[]) {
        this.sheriffLookup[SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES] = [];
        allSheriffDuties.forEach(({ assignmentId, ...sd }) => {
            const sdId = sd.id as string;
            this.sheriffDutyLookup[sdId] = sd;
            const sheriffDuty = this.sheriffDutyLookup[sdId];

            // add item to assignment sheriffduty lookup
            this.reverseAssignmentLookup[sdId] = assignmentId;
            this.assignmentLookup[assignmentId] = this.assignmentLookup[assignmentId] || [];
            this.assignmentLookup[assignmentId].push(sheriffDuty);

            // Add sheriff duty to sheriff lookup based on id, or add to unassigned list
            const sheriffId = sd.sheriffId || SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES;
            this.sheriffLookup[sheriffId] = this.sheriffLookup[sheriffId] || [];
            this.sheriffLookup[sheriffId].push(sheriffDuty);
        });
    }

    getAssociatedAssignmentId(sheriffDuty:SheriffDuty){
        return this.reverseAssignmentLookup[sheriffDuty.id as string];
    }

    getSheriffDutiesBySheriff(sheriffId?: string) {
        let sheriffDuties: SheriffDuty[];
        if (!sheriffId) {
            sheriffDuties = this.sheriffLookup[SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES];
        } else {
            sheriffDuties = this.sheriffLookup[sheriffId];
        }
        return sheriffDuties || [];
    }

    getSheriffDutiesByAssignment(assignmentId: string) {
        return this.assignmentLookup[assignmentId] || [];
    }

    /**
     * Returns whether or not assigning the given sheriffDuty to the sheriffId
     * would double book the sheriff
     * @param {SheriffDuty} sheriffDuty
     * @param {*} sheriffId
     * @returns {boolean}
     * @memberof SheriffDutyMapper
     */
    wouldDoubleBookSheriff({ startDateTime, endDateTime }: SheriffDuty, sheriffId: string): boolean {
        if (!sheriffId) {
            return false;
        }
        const proposedTimeRange: TimeRange = {
            startTime: startDateTime,
            endTime: endDateTime
        }
        // check to see if proposed time range overlaps with 
        // any already assigned to the sheriff
        return this.getSheriffDutiesBySheriff(sheriffId)
            .some(sd => {
                return doTimeRangesOverlap(
                    {
                        startTime: sd.startDateTime,
                        endTime: sd.endDateTime
                    },
                    proposedTimeRange
                );
            });

    }

    createSheriffDuty(dutyId: string, startTime: string, endTime: string) {
        // create new unassigned SherrifDuty based
        const newUnassignedSheriffDuty = <SheriffDuty> { 
            dutyId: dutyId,
            startDateTime: startTime,
            endDateTime: endTime            
        };
        this._createdSheriffDuties.push(newUnassignedSheriffDuty);
    }

    assignSheriff(sheriffDuty: SheriffDuty, sheriffId: string) {
        const unassignedIndex = this.sheriffLookup[SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES].findIndex(sd => sd.id === sheriffDuty.id);
        if (unassignedIndex > -1) {
            // remove item from unassigned lookup
            this.sheriffLookup[SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES].splice(unassignedIndex, 1);

            // update item within main lookup with the duty assigned
            const storedSheriffDuty = this.sheriffDutyLookup[sheriffDuty.id as string];
            storedSheriffDuty.sheriffId = sheriffId;

            this.sheriffLookup[sheriffId] = this.sheriffLookup[sheriffId] || [];
            this.sheriffLookup[sheriffId].push(storedSheriffDuty);
            this._updatedSheriffDuties.push(storedSheriffDuty);
        }
    }

    get unassignedSheriffDuties() {
        return this.sheriffLookup[SheriffDutyAssignmentMap.UNASSIGNED_SHERIFF_DUTIES];
    }

    get updatedSheriffDuties() {
        return this._updatedSheriffDuties.map(({ startDateTime, endDateTime, ...sd }) =>
            ({
                ...sd,
                startDateTime: moment(startDateTime).format(),
                endDateTime: moment(endDateTime).format()
            }) as SheriffDuty
        );
    }

    get createdSheriffDuties() {
        return this._createdSheriffDuties.map(({ startDateTime, endDateTime, ...sd }) =>
            ({
                ...sd,
                startDateTime: moment(startDateTime).format(),
                endDateTime: moment(endDateTime).format()
            }) as SheriffDuty
        );
    }
}