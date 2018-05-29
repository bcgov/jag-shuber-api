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
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/client/utils/time.js.map