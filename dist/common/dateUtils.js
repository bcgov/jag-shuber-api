"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
exports.DATE_FORMAT = 'YYYY-MM-DD';
function getDateString(date) {
    var dateMoment = date ? moment_1.default(date) : moment_1.default().startOf('day');
    return dateMoment.format('YYYY-MM-DD');
}
exports.getDateString = getDateString;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/common/dateUtils.js.map