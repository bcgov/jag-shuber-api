"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
exports.DATE_FORMAT = 'YYYY-MM-DD';
function getDateString(date) {
    const dateMoment = date ? moment_1.default(date) : moment_1.default().startOf('day');
    return dateMoment.format('YYYY-MM-DD');
}
exports.getDateString = getDateString;
//# sourceMappingURL=../../src/dist/common/dateUtils.js.map