import moment, { Moment } from 'moment';
import { DateType, TimeRange, TimeType } from './types';
export declare const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export declare const TIME_FORMAT_TZ: string;
export declare function toTimeString(time?: DateType): string;
export declare function fromTimeString(timeString: string): Moment;
export declare function setTime(momentToSet: DateType, timeToSet: DateType): moment.Moment;
/**
 * Normalizes a given time range so that the start is before the end
 *
 * @export
 * @param {TimeRange} range
 * @returns {TimeRange}
 */
export declare function normalizeTimeRange(range: TimeRange): TimeRange;
/**
 * Returns a boolean indicating wether or not a given time falls within a given TimeRange
 * Note that this comparison defaults to being inclusive i.e. "[]"
 * @export
 * @param {TimeType} time
 * @param {TimeRange} range
 * @param {boolean} [inclusive="[]"]
 * @returns {boolean}
 */
export declare function isTimeWithin(time: TimeType, range: TimeRange, inclusivity?: "()" | "[)" | "(]" | "[]"): boolean;
export declare function areTimeRangesSame(timeRangeA: TimeRange, timeRangeB: TimeRange): boolean;
export declare function doTimeRangesOverlap(timeRangeA: TimeRange, timeRangeB: TimeRange): boolean;
