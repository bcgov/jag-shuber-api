import moment, { Moment } from 'moment';
import { DateType, TimeRange, TimeType } from './types';

export const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export const TIME_FORMAT_TZ = `${TIME_FORMAT_NO_TZ}Z`;

export function toTimeString(time?: DateType) {
    let timeMoment: Moment = moment();
    if (typeof time === typeof 'string') {
        timeMoment = moment(time, [moment.ISO_8601, TIME_FORMAT_NO_TZ, TIME_FORMAT_TZ]);
    } else if (typeof time === typeof 0) {
        timeMoment = moment.unix(time as number);
    } else {
        timeMoment = moment(time);
    }
    return timeMoment.format(TIME_FORMAT_TZ);
}

export function fromTimeString(timeString: string): Moment {
    const returnMoment = moment.parseZone(timeString, [moment.ISO_8601, TIME_FORMAT_NO_TZ, TIME_FORMAT_TZ], true);
    if (!returnMoment.isValid()) {
        return moment.parseZone(timeString);
    } else {
        return returnMoment;
    }
}

export function setTime(momentToSet: DateType, timeToSet: DateType) {
    let timeMoment: Moment | undefined;
    if (typeof timeToSet === typeof "string") {
        timeMoment = fromTimeString(timeToSet as string);
    } else {
        // Parse the time moment with the timezone 
        timeMoment = moment.parseZone(timeToSet);
    }

    // Shift the moment that we want to alter into the same time offset
    const newMoment = moment(momentToSet)
        .utcOffset(timeMoment.utcOffset());

    // Then set the hours, mins, seconds and shift it back into utc
    return newMoment
        .set({
            hour: timeMoment.hours(),
            minute: timeMoment.minute(),
            seconds: timeMoment.seconds()
        }).utc();
}

function rangeToMoments(range: TimeRange) {
    return {
        start: moment(range.startTime),
        end: moment(range.endTime)
    }
}

/**
 * Normalizes a given time range so that the start is before the end
 *
 * @export
 * @param {TimeRange} range
 * @returns {TimeRange}
 */
export function normalizeTimeRange(range: TimeRange): TimeRange {
    return moment(range.startTime).isAfter(moment(range.endTime))
        ? { startTime: range.endTime, endTime: range.startTime }
        : range;
}

/**
 * Returns a boolean indicating wether or not a given time falls within a given TimeRange
 * Note that this comparison defaults to being inclusive i.e. "[]"
 * @export
 * @param {TimeType} time
 * @param {TimeRange} range
 * @param {boolean} [inclusive="[]"]
 * @returns {boolean}
 */
export function isTimeWithin(time: TimeType, range: TimeRange, inclusivity?: "()" | "[)" | "(]" | "[]"): boolean {
    const timeMoment = moment(time);
    const { start: rangeStart, end: rangeEnd } = rangeToMoments(normalizeTimeRange(range));
    return timeMoment.isBetween(rangeStart, rangeEnd, undefined, inclusivity);
}


export function areTimeRangesSame(timeRangeA: TimeRange, timeRangeB: TimeRange): boolean {
    const { startTime: startA, endTime: endA } = normalizeTimeRange(timeRangeA);
    const { startTime: startB, endTime: endB } = normalizeTimeRange(timeRangeB);    

    return (moment(startA).isSame(moment(startB)) && moment(endA).isSame(moment(endB)))
}

export function doTimeRangesOverlap(timeRangeA: TimeRange, timeRangeB: TimeRange): boolean {
    return areTimeRangesSame(timeRangeA,timeRangeB)
        || isTimeWithin(timeRangeA.startTime, timeRangeB)
        || isTimeWithin(timeRangeA.endTime, timeRangeB)
        || isTimeWithin(timeRangeB.startTime, timeRangeA)
        || isTimeWithin(timeRangeB.endTime, timeRangeA);
}