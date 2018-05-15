"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const SA = __importStar(require("superagent"));
const superagent_absolute_1 = __importDefault(require("superagent-absolute"));
const superagent_use_1 = __importDefault(require("superagent-use"));
const Client_1 = __importDefault(require("./Client"));
class ExtendedClient extends Client_1.default {
    constructor(baseUrl) {
        super(superagent_absolute_1.default(superagent_use_1.default(SA.agent()))(baseUrl));
        this.agent.use((req) => this.interceptRequest(req));
        this.errorProcessor = this.processError;
    }
    interceptRequest(req) {
        return this._requestInterceptor ? this._requestInterceptor(req) : req;
    }
    set requestInterceptor(interceptor) {
        this._requestInterceptor = interceptor;
    }
    static isValidationError(err) {
        return err.response.body.name === "ValidateError";
    }
    processError(err) {
        if (ExtendedClient.isValidationError(err)) {
            let message = ["Validation Error"];
            const fields = err.response.body.fields || {};
            message.push(...Object.keys(fields).map(k => `${k}: "${fields[k].message}"`));
            const newMessage = message.join(' | ');
            err.message = newMessage;
        }
        else if (err.response.body.message) {
            err.message = err.response.body.message;
        }
        return err;
    }
    nullOn404(method) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield method();
            }
            catch (err) {
                if (err.status === 404) {
                    return undefined;
                }
                else {
                    throw err;
                }
            }
        });
    }
    GetRegionById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetRegionById").call(this, id));
        });
    }
    GetCourthouseById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetCourthouseById").call(this, id));
        });
    }
    GetSheriffById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetSheriffById").call(this, id));
        });
    }
    GetSheriffs(courthouseId = "") {
        return super.GetSheriffs(courthouseId);
    }
    GetCourtroomById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetCourtroomById").call(this, id));
        });
    }
    GetCourtrooms(courthouseId = "") {
        return super.GetCourtrooms(courthouseId);
    }
    GetAssignmentById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetAssignmentById").call(this, id));
        });
    }
    GetAssignments(courthouseId = "", startDate, endDate) {
        const startMoment = moment_1.default(startDate);
        const endMoment = endDate ? moment_1.default(endDate) : moment_1.default(startMoment);
        return super.GetAssignments(courthouseId, startMoment.toISOString(), endMoment.toISOString());
    }
    GetRuns(courthouseId = "") {
        return super.GetRuns(courthouseId);
    }
    GetRunById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetRunById").call(this, id));
        });
    }
    GetShifts(courthouseId = "") {
        return super.GetShifts(courthouseId);
    }
    GetShiftById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetShiftById").call(this, id));
        });
    }
    GetDutyRecurrenceById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetDutyRecurrenceById").call(this, id));
        });
    }
    GetDutyRecurrences(startDate, endDate) {
        const startMoment = moment_1.default(startDate);
        const endMoment = endDate ? moment_1.default(endDate) : moment_1.default(startMoment);
        return super.GetDutyRecurrences(startMoment.toISOString(), endMoment.toISOString());
    }
    GetDutyById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetDutyById").call(this, id));
        });
    }
}
exports.default = ExtendedClient;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/client/ExtendedClient.js.map