"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.TIME_FORMAT_NO_TZ = "HH:mm:ss";
exports.TIME_FORMAT_TZ = exports.TIME_FORMAT_NO_TZ + "Z";
function toTimeString(time) {
    var timeMoment = moment_1.default();
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
function setTime(momentToSet, timeString) {
    // Parse the time moment with the timezone 
    var timeMoment = moment_1.default.parseZone(timeString);
    var newMoment = moment_1.default(momentToSet)
        .utcOffset(timeMoment.utcOffset());
    return newMoment
        .set({
        hour: timeMoment.hours(),
        minute: timeMoment.minute(),
        seconds: timeMoment.seconds()
    }).utcOffset(0);
}
exports.setTime = setTime;
function adjustForTimezone(momentToAdjust) {
    var pacificTimeZoneOffset = 7 * 60; // 7 hours * 60 minutes
    var timeOffset = moment_1.default(momentToAdjust).utcOffset() + pacificTimeZoneOffset;
    return moment_1.default(momentToAdjust).add(timeOffset, 'minutes');
}
exports.adjustForTimezone = adjustForTimezone;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/common/time.js.map