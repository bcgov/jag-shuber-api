"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var authentication_1 = require("../authentication");
exports.createdDtm = moment_1.default(new Date()).toISOString();
exports.updatedDtm = moment_1.default(new Date()).toISOString();
exports.createdBy = authentication_1.SYSTEM_USER_DISPLAY_NAME;
exports.updatedBy = authentication_1.SYSTEM_USER_DISPLAY_NAME;
// Auth
__export(require("./auth"));
// Assignment Types
__export(require("./assignmentTypes"));
//# sourceMappingURL=../../../src/dist/common/generatorData/index.js.map