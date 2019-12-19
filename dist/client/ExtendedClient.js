"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
const superagent_prefix_1 = __importDefault(require("superagent-prefix"));
const superagent_use_1 = __importDefault(require("superagent-use"));
const Client_1 = __importDefault(require("./Client"));
const TimeUtils_1 = require("../common/TimeUtils");
const Errors_1 = require("../common/Errors");
const dateUtils_1 = require("../common/dateUtils");
const Messages_1 = require("../common/Messages");
class ExtendedClient extends Client_1.default {
    constructor(baseUrl) {
        super(superagent_use_1.default(SA.agent())
            .use(superagent_prefix_1.default(baseUrl)));
        this.agent.use((req) => this.interceptRequest(req));
        this.errorProcessor = this.processError;
        this.timezoneOffset = -(new Date().getTimezoneOffset() / 60);
    }
    interceptRequest(req) {
        req.set('Accept', 'application/javascript');
        req.set('TZ-Offset', `${this.timezoneOffset}`);
        // SITEMINDER does not allow DELETE methods through, so here we use
        // a POST with the X-HTTP-METHOD-OVERRIDE
        if (req.method === 'DELETE') {
            req.method = 'POST';
            req.set('X-HTTP-METHOD-OVERRIDE', 'DELETE');
        }
        return this._requestInterceptor ? this._requestInterceptor(req) : req;
    }
    set requestInterceptor(interceptor) {
        this._requestInterceptor = interceptor;
    }
    get requestInterceptor() {
        return this._requestInterceptor;
    }
    handleResponse(response) {
        return super.handleResponse(response);
    }
    ensureToken() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super("ensureToken").call(this);
            }
            catch (err) {
                console.error(`Error fetching api token: '${err && err.message ? err.message : err}'`);
            }
        });
    }
    processError(err) {
        let apiError = new Errors_1.ApiError(err);
        return apiError;
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
    GetLocationById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetLocationById").call(this, id));
        });
    }
    GetSheriffById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetSheriffById").call(this, id));
        });
    }
    GetSheriffs(locationId = "") {
        return super.GetSheriffs(locationId);
    }
    GetCourtroomById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetCourtroomById").call(this, id));
        });
    }
    GetCourtrooms(locationId = "") {
        return super.GetCourtrooms(locationId);
    }
    GetAssignmentById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetAssignmentById").call(this, id));
        });
    }
    GetAssignments(locationId = "", startDate, endDate) {
        const startMoment = moment_1.default(startDate);
        const endMoment = endDate ? moment_1.default(endDate) : moment_1.default(startMoment);
        return super.GetAssignments(locationId, startMoment.toISOString(), endMoment.toISOString());
    }
    GetEscortRuns(locationId = "") {
        return super.GetEscortRuns(locationId);
    }
    GetEscortRunById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetEscortRunById").call(this, id));
        });
    }
    GetShifts(locationId = "") {
        return super.GetShifts(locationId);
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
    GetLeaveById(id) {
        return this.nullOn404(() => super.GetLeaveById(id));
    }
    GetSheriffDutyById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetSheriffDutyById").call(this, id));
        });
    }
    ensureTimeZone(...dutyRecurrences) {
        return dutyRecurrences.map(dr => (Object.assign({}, dr, { startTime: TimeUtils_1.toTimeString(dr.startTime), endTime: TimeUtils_1.toTimeString(dr.endTime) })));
    }
    CreateDutyRecurrence(model) {
        return super.CreateDutyRecurrence(this.ensureTimeZone(model)[0]);
    }
    UpdateDutyRecurrence(id, model) {
        return super.UpdateDutyRecurrence(id, this.ensureTimeZone(model)[0]);
    }
    CreateAssignment(model) {
        const { dutyRecurrences = [] } = model;
        return super.CreateAssignment(Object.assign({}, model, { dutyRecurrences: this.ensureTimeZone(...dutyRecurrences) }));
    }
    UpdateAssignment(id, model) {
        const { dutyRecurrences = [] } = model;
        return super.UpdateAssignment(id, Object.assign({}, model, { dutyRecurrences: this.ensureTimeZone(...dutyRecurrences) }));
    }
    ensureLeaveTimes(model) {
        return Object.assign({}, model, { startTime: model.startTime ? TimeUtils_1.toTimeString(model.startTime) : undefined, endTime: model.endTime ? TimeUtils_1.toTimeString(model.endTime) : undefined });
    }
    CreateLeave(model) {
        return super.CreateLeave(this.ensureLeaveTimes(model));
    }
    UpdateLeave(id, model) {
        return super.UpdateLeave(id, this.ensureLeaveTimes(model));
    }
    UpdateMultipleShifts(model) {
        const { startTime, endTime } = model, rest = __rest(model, ["startTime", "endTime"]);
        const request = Object.assign({}, rest, { startTime: startTime ? moment_1.default(startTime).format() : undefined, endTime: endTime ? moment_1.default(endTime).format() : undefined });
        return super.UpdateMultipleShifts(request);
    }
    ImportDefaultDuties(request) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const { locationId, date } = request;
            return yield _super("ImportDefaultDuties").call(this, {
                locationId,
                date: dateUtils_1.getDateString(date)
            });
        });
    }
    AutoAssignSheriffDuties(request) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const { locationId, date } = request;
            return yield _super("AutoAssignSheriffDuties").call(this, {
                locationId,
                date: dateUtils_1.getDateString(date)
            });
        });
    }
    /**
     * @deprecated Please use ExpireAssignment instead.
     */
    DeleteAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(Messages_1.ERROR_DEPRECATED_DELETE_ASSIGNMENT);
        });
    }
    /**
     * @deprecated Please use ExpireDutyRecurrence instead.
     */
    DeleteDutyRecurrence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error(Messages_1.ERROR_DEPRECATED_DELETE_DUTYRECURRENCE);
        });
    }
    GetUsers() {
        return super.GetUsers();
    }
    GetUsersByLocationId(locationId = "") {
        return super.GetUsers();
    }
    GetUserById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetSheriffById").call(this, id));
        });
    }
    GetRoles() {
        return super.GetRoles();
    }
    GetRoleById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetRoleById").call(this, id));
        });
    }
    GetUserRoleById(id) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.nullOn404(() => _super("GetUserRoleById").call(this, id));
        });
    }
    GetApiScopes() {
        return super.GetApiScopes();
    }
    GetFrontendScopes() {
        return super.GetFrontendScopes();
    }
    GetFrontendScopePermissions() {
        return super.GetFrontendScopePermissions();
    }
    GetRoleApiScopes() {
        return super.GetRoleApiScopes();
    }
    GetRoleFrontendScopes() {
        return super.GetRoleFrontendScopes();
    }
    GetRolePermissions() {
        return super.GetRolePermissions();
    }
}
exports.default = ExtendedClient;
//# sourceMappingURL=../../src/dist/client/ExtendedClient.js.map