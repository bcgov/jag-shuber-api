"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
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
var moment_1 = __importDefault(require("moment"));
var SA = __importStar(require("superagent"));
var superagent_prefix_1 = __importDefault(require("superagent-prefix"));
var superagent_use_1 = __importDefault(require("superagent-use"));
var Client_1 = __importDefault(require("./Client"));
var TimeUtils_1 = require("../common/TimeUtils");
var Errors_1 = require("../common/Errors");
var dateUtils_1 = require("../common/dateUtils");
var Messages_1 = require("../common/Messages");
var ExtendedClient = /** @class */ (function (_super) {
    __extends(ExtendedClient, _super);
    function ExtendedClient(baseUrl) {
        var _this = _super.call(this, superagent_use_1.default(SA.agent())
            .use(superagent_prefix_1.default(baseUrl))) || this;
        _this.agent.use(function (req) { return _this.interceptRequest(req); });
        _this.errorProcessor = _this.processError;
        _this.timezoneOffset = -(new Date().getTimezoneOffset() / 60);
        return _this;
    }
    ExtendedClient.prototype.interceptRequest = function (req) {
        req.set('Accept', 'application/javascript');
        req.set('TZ-Offset', "" + this.timezoneOffset);
        // SITEMINDER does not allow DELETE methods through, so here we use
        // a POST with the X-HTTP-METHOD-OVERRIDE
        if (req.method === 'DELETE') {
            req.method = 'POST';
            req.set('X-HTTP-METHOD-OVERRIDE', 'DELETE');
        }
        return this._requestInterceptor ? this._requestInterceptor(req) : req;
    };
    Object.defineProperty(ExtendedClient.prototype, "requestInterceptor", {
        get: function () {
            return this._requestInterceptor;
        },
        set: function (interceptor) {
            this._requestInterceptor = interceptor;
        },
        enumerable: true,
        configurable: true
    });
    ExtendedClient.prototype.handleResponse = function (response) {
        return _super.prototype.handleResponse.call(this, response);
    };
    ExtendedClient.prototype.ensureToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _super.prototype.ensureToken.call(this)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error fetching api token: '" + (err_1 && err_1.message ? err_1.message : err_1) + "'");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExtendedClient.prototype.processError = function (err) {
        var apiError = new Errors_1.ApiError(err);
        return apiError;
    };
    ExtendedClient.prototype.nullOn404 = function (method) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, method()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_2 = _a.sent();
                        if (err_2.status === 404) {
                            return [2 /*return*/, undefined];
                        }
                        else {
                            throw err_2;
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ExtendedClient.prototype.GetRegionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetRegionById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetCourthouseById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetCourthouseById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetSheriffById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetSheriffById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetSheriffs = function (courthouseId) {
        if (courthouseId === void 0) { courthouseId = ""; }
        return _super.prototype.GetSheriffs.call(this, courthouseId);
    };
    ExtendedClient.prototype.GetCourtroomById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetCourtroomById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetCourtrooms = function (courthouseId) {
        if (courthouseId === void 0) { courthouseId = ""; }
        return _super.prototype.GetCourtrooms.call(this, courthouseId);
    };
    ExtendedClient.prototype.GetAssignmentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetAssignmentById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetAssignments = function (courthouseId, startDate, endDate) {
        if (courthouseId === void 0) { courthouseId = ""; }
        var startMoment = moment_1.default(startDate);
        var endMoment = endDate ? moment_1.default(endDate) : moment_1.default(startMoment);
        return _super.prototype.GetAssignments.call(this, courthouseId, startMoment.toISOString(), endMoment.toISOString());
    };
    ExtendedClient.prototype.GetRuns = function (courthouseId) {
        if (courthouseId === void 0) { courthouseId = ""; }
        return _super.prototype.GetRuns.call(this, courthouseId);
    };
    ExtendedClient.prototype.GetRunById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetRunById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetShifts = function (courthouseId) {
        if (courthouseId === void 0) { courthouseId = ""; }
        return _super.prototype.GetShifts.call(this, courthouseId);
    };
    ExtendedClient.prototype.GetShiftById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetShiftById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetDutyRecurrenceById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetDutyRecurrenceById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetDutyRecurrences = function (startDate, endDate) {
        var startMoment = moment_1.default(startDate);
        var endMoment = endDate ? moment_1.default(endDate) : moment_1.default(startMoment);
        return _super.prototype.GetDutyRecurrences.call(this, startMoment.toISOString(), endMoment.toISOString());
    };
    ExtendedClient.prototype.GetDutyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetDutyById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.GetLeaveById = function (id) {
        var _this = this;
        return this.nullOn404(function () { return _super.prototype.GetLeaveById.call(_this, id); });
    };
    ExtendedClient.prototype.GetSheriffDutyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.nullOn404(function () { return _super.prototype.GetSheriffDutyById.call(_this, id); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.ensureTimeZone = function () {
        var dutyRecurrences = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            dutyRecurrences[_i] = arguments[_i];
        }
        return dutyRecurrences.map(function (dr) { return (__assign({}, dr, { startTime: TimeUtils_1.toTimeString(dr.startTime), endTime: TimeUtils_1.toTimeString(dr.endTime) })); });
    };
    ExtendedClient.prototype.CreateDutyRecurrence = function (model) {
        return _super.prototype.CreateDutyRecurrence.call(this, this.ensureTimeZone(model)[0]);
    };
    ExtendedClient.prototype.UpdateDutyRecurrence = function (id, model) {
        return _super.prototype.UpdateDutyRecurrence.call(this, id, this.ensureTimeZone(model)[0]);
    };
    ExtendedClient.prototype.CreateAssignment = function (model) {
        var _a = model.dutyRecurrences, dutyRecurrences = _a === void 0 ? [] : _a;
        return _super.prototype.CreateAssignment.call(this, __assign({}, model, { dutyRecurrences: this.ensureTimeZone.apply(this, __spread(dutyRecurrences)) }));
    };
    ExtendedClient.prototype.UpdateAssignment = function (id, model) {
        var _a = model.dutyRecurrences, dutyRecurrences = _a === void 0 ? [] : _a;
        return _super.prototype.UpdateAssignment.call(this, id, __assign({}, model, { dutyRecurrences: this.ensureTimeZone.apply(this, __spread(dutyRecurrences)) }));
    };
    ExtendedClient.prototype.ensureLeaveTimes = function (model) {
        return __assign({}, model, { startTime: model.startTime ? TimeUtils_1.toTimeString(model.startTime) : undefined, endTime: model.endTime ? TimeUtils_1.toTimeString(model.endTime) : undefined });
    };
    ExtendedClient.prototype.CreateLeave = function (model) {
        return _super.prototype.CreateLeave.call(this, this.ensureLeaveTimes(model));
    };
    ExtendedClient.prototype.UpdateLeave = function (id, model) {
        return _super.prototype.UpdateLeave.call(this, id, this.ensureLeaveTimes(model));
    };
    ExtendedClient.prototype.UpdateMultipleShifts = function (model) {
        var startTime = model.startTime, endTime = model.endTime, rest = __rest(model, ["startTime", "endTime"]);
        var request = __assign({}, rest, { startTime: startTime ? moment_1.default(startTime).format() : undefined, endTime: endTime ? moment_1.default(endTime).format() : undefined });
        return _super.prototype.UpdateMultipleShifts.call(this, request);
    };
    ExtendedClient.prototype.ImportDefaultDuties = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var courthouseId, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courthouseId = request.courthouseId, date = request.date;
                        return [4 /*yield*/, _super.prototype.ImportDefaultDuties.call(this, {
                                courthouseId: courthouseId,
                                date: dateUtils_1.getDateString(date)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ExtendedClient.prototype.AutoAssignSheriffDuties = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var courthouseId, date;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        courthouseId = request.courthouseId, date = request.date;
                        return [4 /*yield*/, _super.prototype.AutoAssignSheriffDuties.call(this, {
                                courthouseId: courthouseId,
                                date: dateUtils_1.getDateString(date)
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @deprecated Please use ExpireAssignment instead.
     */
    ExtendedClient.prototype.DeleteAssignment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(Messages_1.ERROR_DEPRECATED_DELETE_ASSIGNMENT);
            });
        });
    };
    /**
     * @deprecated Please use ExpireDutyRecurrence instead.
     */
    ExtendedClient.prototype.DeleteDutyRecurrence = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(Messages_1.ERROR_DEPRECATED_DELETE_DUTYRECURRENCE);
            });
        });
    };
    return ExtendedClient;
}(Client_1.default));
exports.default = ExtendedClient;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/client/ExtendedClient.js.map