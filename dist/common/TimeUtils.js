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
function fromTimeString(timeString) {
    var returnMoment = moment_1.default.parseZone(timeString, [moment_1.default.ISO_8601, exports.TIME_FORMAT_NO_TZ, exports.TIME_FORMAT_TZ], true);
    if (!returnMoment.isValid()) {
        return moment_1.default.parseZone(timeString);
    }
    else {
        return returnMoment;
    }
}
exports.fromTimeString = fromTimeString;
function setTime(momentToSet, timeToSet) {
    var timeMoment;
    if (typeof timeToSet === typeof "string") {
        timeMoment = fromTimeString(timeToSet);
    }
    else {
        // Parse the time moment with the timezone 
        timeMoment = moment_1.default.parseZone(timeToSet);
    }
    // Shift the moment that we want to alter into the same time offset
    var newMoment = moment_1.default(momentToSet)
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
//# sourceMappingURL=../../src/dist/common/TimeUtils.js.map