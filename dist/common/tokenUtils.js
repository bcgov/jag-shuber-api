"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
function decodeJwt(token) {
    if (token) {
        return jwt_decode_1.default(token);
    }
    return undefined;
}
exports.decodeJwt = decodeJwt;
//# sourceMappingURL=../../src/dist/common/tokenUtils.js.map