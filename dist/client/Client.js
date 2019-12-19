"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______
|______||______||______||______||______||______||______||______||______||______||______|
  ___          _                  _____                                 _             _
 / _ \        | |                |  __ \                               | |           | |
/ /_\ \ _   _ | |_  ___          | |  \/  ___  _ __    ___  _ __  __ _ | |_  ___   __| |
|  _  || | | || __|/ _ \         | | __  / _ \| '_ \  / _ \| '__|/ _` || __|/ _ \ / _` |
| | | || |_| || |_| (_) |        | |_\ \|  __/| | | ||  __/| |  | (_| || |_|  __/| (_| |
\_| |_/ \__,_| \__|\___/          \____/ \___||_| |_| \___||_|   \__,_| \__|\___| \__,_|
______                 _   _         _             ___  ___            _  _   __
|  _  \               | \ | |       | |            |  \/  |           | |(_) / _|
| | | | ___           |  \| |  ___  | |_           | .  . |  ___    __| | _ | |_  _   _
| | | |/ _ \          | . ` | / _ \ | __|          | |\/| | / _ \  / _` || ||  _|| | | |
| |/ /| (_) |         | |\  || (_) || |_           | |  | || (_) || (_| || || |  | |_| |
|___/  \___/          \_| \_/ \___/  \__|          \_|  |_/ \___/  \__,_||_||_|   \__, |
                                                                                   __/ |
                                                                                  |___/
 ______  ______  ______  ______  ______  ______  ______  ______  ______  ______  ______
|______||______||______||______||______||______||______||______||______||______||______|

Client is generated from swagger.json file
*/
const superAgent = __importStar(require("superagent"));
const authentication_1 = require("../common/authentication");
const TypedEvent_1 = require("../common/TypedEvent");
const cookieUtils_1 = require("../common/cookieUtils");
class Client {
    constructor(_agent = superAgent.agent()) {
        this._agent = _agent;
        this._previousToken = null;
        this._tokenChangedEvent = new TypedEvent_1.TypedEvent();
        /**
         * A hook to allow errors occured to be processed further before being thrown
         * out of the api client. This is useful for modifying validation errors etc.
         *
         * @memberof Client
         */
        this.errorProcessor = (e) => e;
    }
    /**
     * An event that is fired when the app token associated with this client
     * has changed.
     *
     * @readonly
     * @type {TypedEvent<string|undefined>}
     * @memberof Client
     */
    get onTokenChanged() {
        return this._tokenChangedEvent;
    }
    /**
     * Returns the underlying SuperAgent instance being used for requests
     *
     * @readonly
     * @memberof Client
     */
    get agent() {
        return this._agent;
    }
    /**
     * Hook responsible for extracting the value out of the response
     *
     * @protected
     * @template T
     * @param {superAgent.Response} response
     * @returns {T}
     * @memberof Client
     */
    handleResponse(response) {
        return response.body;
    }
    /**
     * Ensures that a application token currently exists and fetches a new one
     * if the old one has expired or is not present.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof Client
     */
    ensureToken() {
        return __awaiter(this, void 0, void 0, function* () {
            let token = cookieUtils_1.retreiveCookieValue(authentication_1.TOKEN_COOKIE_NAME, this.agent);
            // if there is no token, we will go out and retreive one
            if (token == undefined) {
                try {
                    console.log('Fetching new token');
                    yield this.GetToken();
                }
                catch (e) {
                    console.error("Couldn't fetch token", e);
                }
            }
        });
    }
    /**
     * Takes a token and handles emitting events if the token has changed
     *
     * @protected
     * @param {string} [tokenString]
     * @memberof Client
     */
    handleNewToken(token) {
        if (token !== this._previousToken) {
            this._previousToken = token;
            this.onTokenChanged.emit(token);
        }
    }
    /**
     * All operations in the client are routed through this method which
     * is responsible for issuing and handling responses in a way which
     * errors can be captured and processed within the client.
     * This method also ensures that a client token exists before issuing the
     * request.
     *
     * @protected
     * @template T
     * @param {() => Promise<superAgent.Response>} worker
     * @returns {Promise<T>}
     * @memberof Client
     */
    tryRequest(worker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ensureToken();
                const response = yield worker();
                return this.handleResponse(response);
            }
            catch (error) {
                if (this.errorProcessor) {
                    throw this.errorProcessor(error);
                }
                else {
                    throw error;
                }
            }
        });
    }
    GetToken() {
        return __awaiter(this, void 0, void 0, function* () {
            // For getting the token, we need to bypass the tryRequest as 
            // it will ensure token which will call this method again
            try {
                const response = yield this.agent.get(`/token`);
                const { token: tokenString } = this.handleResponse(response);
                this.handleNewToken(tokenString);
                return tokenString;
            }
            catch (e) {
                this.handleNewToken();
                throw e;
            }
        });
    }
    Logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.agent.post(`/token/delete`);
            this.handleNewToken();
        });
    }
    GetCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/User/me`);
                return response;
            }));
        });
    }
    GetUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/User`);
                return response;
            }));
        });
    }
    CreateUser(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/User`)
                    .send(model);
                return response;
            }));
        });
    }
    GetUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/User/${id}`);
                return response;
            }));
        });
    }
    UpdateUser(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/User/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/User/${id}`);
                return response;
            }));
        });
    }
    GenerateUsersForSheriffs() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/User/generateAll`);
                return response;
            }));
        });
    }
    GetCurrentUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/UserRole/me`);
                return response;
            }));
        });
    }
    GetUserRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/UserRole`);
                return response;
            }));
        });
    }
    CreateUserRole(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/UserRole`)
                    .send(model);
                return response;
            }));
        });
    }
    GetUserRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/UserRole/${id}`);
                return response;
            }));
        });
    }
    UpdateUserRole(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/UserRole/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteUserRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/UserRole/${id}`);
                return response;
            }));
        });
    }
    ExpireUserRole(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/UserRole/${id}/expire`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Role`);
                return response;
            }));
        });
    }
    CreateRole(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Role`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Role/${id}`);
                return response;
            }));
        });
    }
    UpdateRole(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/Role/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/Role/${id}`);
                return response;
            }));
        });
    }
    GetRolePermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RolePermission`);
                return response;
            }));
        });
    }
    CreateRolePermission(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/RolePermission`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRolePermissionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RolePermission/${id}`);
                return response;
            }));
        });
    }
    UpdateRolePermission(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/RolePermission/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteRolePermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/RolePermission/${id}`);
                return response;
            }));
        });
    }
    GetApiScopes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/ApiScope`);
                return response;
            }));
        });
    }
    CreateApiScope(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/ApiScope`)
                    .send(model);
                return response;
            }));
        });
    }
    GetApiScopeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/ApiScope/${id}`);
                return response;
            }));
        });
    }
    UpdateApiScope(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/ApiScope/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteApiScope(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/ApiScope/${id}`);
                return response;
            }));
        });
    }
    GetFrontendScopes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/FrontendScope`);
                return response;
            }));
        });
    }
    CreateFrontendScope(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/FrontendScope`)
                    .send(model);
                return response;
            }));
        });
    }
    GetFrontendScopeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/FrontendScope/${id}`);
                return response;
            }));
        });
    }
    UpdateFrontendScope(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/FrontendScope/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteFrontendScope(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/FrontendScope/${id}`);
                return response;
            }));
        });
    }
    GetFrontendScopePermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/FrontendScopePermission`);
                return response;
            }));
        });
    }
    CreateFrontendScopePermission(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/FrontendScopePermission`)
                    .send(model);
                return response;
            }));
        });
    }
    GetFrontendScopePermissionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/FrontendScopePermission/${id}`);
                return response;
            }));
        });
    }
    UpdateFrontendScopePermission(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/FrontendScopePermission/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteFrontendScopePermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/FrontendScopePermission/${id}`);
                return response;
            }));
        });
    }
    GetRoleApiScopes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RoleApiScope`);
                return response;
            }));
        });
    }
    CreateRoleApiScope(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/RoleApiScope`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRoleApiScopeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RoleApiScope/${id}`);
                return response;
            }));
        });
    }
    UpdateRoleApiScope(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/RoleApiScope/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteRoleApiScope(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/RoleApiScope/${id}`);
                return response;
            }));
        });
    }
    GetRoleFrontendScopes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RoleFrontendScope`);
                return response;
            }));
        });
    }
    CreateRoleFrontendScope(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/RoleFrontendScope`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRoleFrontendScopeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/RoleFrontendScope/${id}`);
                return response;
            }));
        });
    }
    UpdateRoleFrontendScope(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/RoleFrontendScope/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteRoleFrontendScope(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/RoleFrontendScope/${id}`);
                return response;
            }));
        });
    }
    GetAssignments(locationId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId,
                "startDate": startDate,
                "endDate": endDate
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Assignments`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateAssignment(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Assignments`)
                    .send(model);
                return response;
            }));
        });
    }
    GetAssignmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Assignments/${id}`);
                return response;
            }));
        });
    }
    UpdateAssignment(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/Assignments/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    ExpireAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Assignments/${id}`);
                return response;
            }));
        });
    }
    DeleteAssignment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/Assignments/${id}`);
                return response;
            }));
        });
    }
    GetRegions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/regions`);
                return response;
            }));
        });
    }
    CreateRegion(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/regions`)
                    .send(model);
                return response;
            }));
        });
    }
    GetRegionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/regions/${id}`);
                return response;
            }));
        });
    }
    UpdateRegion(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/regions/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteRegion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/regions/${id}`);
                return response;
            }));
        });
    }
    GetLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/locations`);
                return response;
            }));
        });
    }
    CreateLocation(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/locations`)
                    .send(model);
                return response;
            }));
        });
    }
    GetLocationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/locations/${id}`);
                return response;
            }));
        });
    }
    UpdateLocation(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/locations/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteLocation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/locations/${id}`);
                return response;
            }));
        });
    }
    GetSheriffs(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/sheriffs`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateSheriff(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/sheriffs`)
                    .send(model);
                return response;
            }));
        });
    }
    GetSheriffById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/sheriffs/${id}`);
                return response;
            }));
        });
    }
    UpdateSheriff(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/sheriffs/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteSheriff(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/sheriffs/${id}`);
                return response;
            }));
        });
    }
    GetCourtrooms(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/courtrooms`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateCourtroom(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/courtrooms`)
                    .send(model);
                return response;
            }));
        });
    }
    GetCourtroomById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/courtrooms/${id}`);
                return response;
            }));
        });
    }
    UpdateCourtroom(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/courtrooms/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteCourtroom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/courtrooms/${id}`);
                return response;
            }));
        });
    }
    GetJailRoleCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/jailroles`);
                return response;
            }));
        });
    }
    GetOtherAssignCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/otherassign`);
                return response;
            }));
        });
    }
    GetWorkSectionCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/worksection`);
                return response;
            }));
        });
    }
    GetSheriffRankCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/sheriffrank`);
                return response;
            }));
        });
    }
    GetEscortRuns(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/escort-runs`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateEscortRun(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/escort-runs`)
                    .send(model);
                return response;
            }));
        });
    }
    GetEscortRunById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/escort-runs/${id}`);
                return response;
            }));
        });
    }
    UpdateEscortRun(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/escort-runs/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteEscortRun(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/escort-runs/${id}`);
                return response;
            }));
        });
    }
    GetShifts(locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Shifts`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateShift(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Shifts`)
                    .send(model);
                return response;
            }));
        });
    }
    GetShiftById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Shifts/${id}`);
                return response;
            }));
        });
    }
    UpdateShift(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/Shifts/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteShift(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/Shifts/${id}`);
                return response;
            }));
        });
    }
    UpdateMultipleShifts(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Shifts/multiple`)
                    .send(model);
                return response;
            }));
        });
    }
    CopyShifts(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Shifts/copy`)
                    .send(model);
                return response;
            }));
        });
    }
    GetDutyRecurrences(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "startDate": startDate,
                "endDate": endDate
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/DutyRecurrences`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateDutyRecurrence(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/DutyRecurrences`)
                    .send(model);
                return response;
            }));
        });
    }
    GetDutyRecurrenceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/DutyRecurrences/${id}`);
                return response;
            }));
        });
    }
    UpdateDutyRecurrence(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/DutyRecurrences/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    ExpireDutyRecurrence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/DutyRecurrences/${id}`);
                return response;
            }));
        });
    }
    DeleteDutyRecurrence(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/DutyRecurrences/${id}`);
                return response;
            }));
        });
    }
    GetDuties(locationId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                "locationId": locationId,
                "startDate": startDate,
                "endDate": endDate
            };
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Duty`)
                    .query(params);
                return response;
            }));
        });
    }
    CreateDuty(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Duty`)
                    .send(model);
                return response;
            }));
        });
    }
    GetDutyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/Duty/${id}`);
                return response;
            }));
        });
    }
    UpdateDuty(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/Duty/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteDuty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/Duty/${id}`);
                return response;
            }));
        });
    }
    ImportDefaultDuties(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/Duty/import`)
                    .send(body);
                return response;
            }));
        });
    }
    GetSheriffDuties() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/SheriffDuty`);
                return response;
            }));
        });
    }
    CreateSheriffDuty(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/SheriffDuty`)
                    .send(model);
                return response;
            }));
        });
    }
    GetSheriffDutyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/SheriffDuty/${id}`);
                return response;
            }));
        });
    }
    UpdateSheriffDuty(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/SheriffDuty/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteSheriffDuty(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/SheriffDuty/${id}`);
                return response;
            }));
        });
    }
    AutoAssignSheriffDuties(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/SheriffDuty/auto-assign`)
                    .send(model);
                return response;
            }));
        });
    }
    GetLeaves() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/leaves`);
                return response;
            }));
        });
    }
    CreateLeave(model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.post(`/leaves`)
                    .send(model);
                return response;
            }));
        });
    }
    GetLeaveById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/leaves/${id}`);
                return response;
            }));
        });
    }
    UpdateLeave(id, model) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.put(`/leaves/${id}`)
                    .send(model);
                return response;
            }));
        });
    }
    DeleteLeave(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.delete(`/leaves/${id}`);
                return response;
            }));
        });
    }
    GetLeaveCancelReasonCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/leave-cancel`);
                return response;
            }));
        });
    }
    GetLeaveTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/leave-type`);
                return response;
            }));
        });
    }
    GetLeaveSubCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/leave-sub-type`);
                return response;
            }));
        });
    }
    GetCourtRoleCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/courtroles`);
                return response;
            }));
        });
    }
    GetGenderCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tryRequest(() => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.agent.get(`/codes/gender`);
                return response;
            }));
        });
    }
}
exports.default = Client;
//# sourceMappingURL=../../src/dist/client/Client.js.map