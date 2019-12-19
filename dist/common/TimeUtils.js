"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.TIME_FORMAT_NO_TZ = "HH:mm:ss";
exports.TIME_FORMAT_TZ = `${exports.TIME_FORMAT_NO_TZ}Z`;
function toTimeString(time) {
    let timeMoment = moment_1.default();
    if (typeof time === typeof 'string') {
        timeMoment = moment_1.default(time, [moment_1.default.ISO_8601, exports.TIME_FORMAT_NO_TZ, exports.TIME_FORMAT_TZ]);
    }
    else if (typeof time === typeof 0) {
        timeMoment = moment_1.default.unix(time);
    }
    else {
        timeMoment = moment_1.default(time);
    }
    return timeMoment.format(exports.TIME_FORMAT_TZ);
}
exports.toTimeString = toTimeString;
function fromTimeString(timeString) {
    const returnMoment = moment_1.default.parseZone(timeString, [moment_1.default.ISO_8601, exports.TIME_FORMAT_NO_TZ, exports.TIME_FORMAT_TZ], true);
    if (!returnMoment.isValid()) {
        return moment_1.default.parseZone(timeString);
    }
    else {
        return returnMoment;
    }
}
exports.fromTimeString = fromTimeString;
function setTime(momentToSet, timeToSet) {
    let timeMoment;
    if (typeof timeToSet === typeof "string") {
        timeMoment = fromTimeString(timeToSet);
    }
    else {
        // Parse the time moment with the timezone 
        timeMoment = moment_1.default.parseZone(timeToSet);
    }
    // Shift the moment that we want to alter into the same time offset
    const newMoment = moment_1.default(momentToSet)
        .utcOffset(timeMoment.utcOffset());
    // Then set the hours, mins, seconds and shift it back into utc
    return newMoment
        .set({
        hour: timeMoment.hours(),
        minute: timeMoment.minute(),
        seconds: timeMoment.seconds()
    }).utc();
}
exports.setTime = setTime;
function rangeToMoments(range) {
    return {
        start: moment_1.default(range.startTime),
        end: moment_1.default(range.endTime)
    };
}
/**
 * Normalizes a given time range so that the start is before the end
 *
 * @export
 * @param {TimeRange} range
 * @returns {TimeRange}
 */
function normalizeTimeRange(range) {
    return moment_1.default(range.startTime).isAfter(moment_1.default(range.endTime))
        ? { startTime: range.endTime, endTime: range.startTime }
        : range;
}
exports.normalizeTimeRange = normalizeTimeRange;
/**
 * Returns a boolean indicating wether or not a given time falls within a given TimeRange
 * Note that this comparison defaults to being inclusive i.e. "[]"
 * @export
 * @param {TimeType} time
 * @param {TimeRange} range
 * @param {boolean} [inclusive="[]"]
 * @returns {boolean}
 */
function isTimeWithin(time, range, inclusivity) {
    const timeMoment = moment_1.default(time);
    const { start: rangeStart, end: rangeEnd } = rangeToMoments(normalizeTimeRange(range));
    return timeMoment.isBetween(rangeStart, rangeEnd, undefined, inclusivity);
}
exports.isTimeWithin = isTimeWithin;
function areTimeRangesSame(timeRangeA, timeRangeB) {
    const { startTime: startA, endTime: endA } = normalizeTimeRange(timeRangeA);
    const { startTime: startB, endTime: endB } = normalizeTimeRange(timeRangeB);
    return (moment_1.default(startA).isSame(moment_1.default(startB)) && moment_1.default(endA).isSame(moment_1.default(endB)));
}
exports.areTimeRangesSame = areTimeRangesSame;
function doTimeRangesOverlap(timeRangeA, timeRangeB) {
    return areTimeRangesSame(timeRangeA, timeRangeB)
        || isTimeWithin(timeRangeA.startTime, timeRangeB)
        || isTimeWithin(timeRangeA.endTime, timeRangeB)
        || isTimeWithin(timeRangeB.startTime, timeRangeA)
        || isTimeWithin(timeRangeB.endTime, timeRangeA);
}
exports.doTimeRangesOverlap = doTimeRangesOverlap;
//# sourceMappingURL=../../src/dist/common/TimeUtils.js.map