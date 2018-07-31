"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExtendedClient_1 = require("./ExtendedClient");
exports.Client = ExtendedClient_1.default;
__export(require("../common/TimeUtils"));
__export(require("../common/TypedEvent"));
__export(require("../common/token"));
__export(require("../common/authentication"));
var _errors = __importStar(require("../common/Errors"));
exports.Errors = _errors;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/client/index.js.map