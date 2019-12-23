"use strict";
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
var superAgent = __importStar(require("superagent"));
var authentication_1 = require("../common/authentication");
var TypedEvent_1 = require("../common/TypedEvent");
var cookieUtils_1 = require("../common/cookieUtils");
var Client = /** @class */ (function () {
    function Client(_agent) {
        if (_agent === void 0) { _agent = superAgent.agent(); }
        this._agent = _agent;
        this._previousToken = null;
        this._tokenChangedEvent = new TypedEvent_1.TypedEvent();
        /**
         * A hook to allow errors occured to be processed further before being thrown
         * out of the api client. This is useful for modifying validation errors etc.
         *
         * @memberof Client
         */
        this.errorProcessor = function (e) { return e; };
    }
    Object.defineProperty(Client.prototype, "onTokenChanged", {
        /**
         * An event that is fired when the app token associated with this client
         * has changed.
         *
         * @readonly
         * @type {TypedEvent<string|undefined>}
         * @memberof Client
         */
        get: function () {
            return this._tokenChangedEvent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "agent", {
        /**
         * Returns the underlying SuperAgent instance being used for requests
         *
         * @readonly
         * @memberof Client
         */
        get: function () {
            return this._agent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Hook responsible for extracting the value out of the response
     *
     * @protected
     * @template T
     * @param {superAgent.Response} response
     * @returns {T}
     * @memberof Client
     */
    Client.prototype.handleResponse = function (response) {
        return response.body;
    };
    /**
     * Ensures that a application token currently exists and fetches a new one
     * if the old one has expired or is not present.
     *
     * @protected
     * @returns {Promise<void>}
     * @memberof Client
     */
    Client.prototype.ensureToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = cookieUtils_1.retreiveCookieValue(authentication_1.TOKEN_COOKIE_NAME, this.agent);
                        if (!(token == undefined)) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.log('Fetching new token');
                        return [4 /*yield*/, this.GetToken()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.error("Couldn't fetch token", e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Takes a token and handles emitting events if the token has changed
     *
     * @protected
     * @param {string} [tokenString]
     * @memberof Client
     */
    Client.prototype.handleNewToken = function (token) {
        if (token !== this._previousToken) {
            this._previousToken = token;
            this.onTokenChanged.emit(token);
        }
    };
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
    Client.prototype.tryRequest = function (worker) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ensureToken()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, worker()];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, this.handleResponse(response)];
                    case 3:
                        error_1 = _a.sent();
                        if (this.errorProcessor) {
                            throw this.errorProcessor(error_1);
                        }
                        else {
                            throw error_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.GetToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, tokenString, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.agent.get("/token")];
                    case 1:
                        response = _a.sent();
                        tokenString = this.handleResponse(response).token;
                        this.handleNewToken(tokenString);
                        return [2 /*return*/, tokenString];
                    case 2:
                        e_2 = _a.sent();
                        this.handleNewToken();
                        throw e_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.Logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.agent.post("/token/delete")];
                    case 1:
                        _a.sent();
                        this.handleNewToken();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.GetCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/User/me")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetUsers = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/User")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateUser = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/User")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.QueryUsers = function (firstName, lastName, badgeNo, sheriffRankCode, locationId, currentLocationId, homeLocationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "firstName": firstName,
                    "lastName": lastName,
                    "badgeNo": badgeNo,
                    "sheriffRankCode": sheriffRankCode,
                    "locationId": locationId,
                    "currentLocationId": currentLocationId,
                    "homeLocationId": homeLocationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/User/search")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/User/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateUser = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/User/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/User/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GenerateUsersForSheriffs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/User/generateAll")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetCurrentUserRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/UserRole/me")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetUserRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/UserRole")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateUserRole = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/UserRole")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetUserRoleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/UserRole/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateUserRole = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/UserRole/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteUserRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/UserRole/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.ExpireUserRole = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/UserRole/" + id + "/expire")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Role")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateRole = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Role")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Role/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateRole = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/Role/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteRole = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/Role/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRolePermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RolePermission")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateRolePermission = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/RolePermission")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRolePermissionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RolePermission/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateRolePermission = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/RolePermission/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteRolePermission = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/RolePermission/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetApiScopes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/ApiScope")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateApiScope = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/ApiScope")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetApiScopeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/ApiScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateApiScope = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/ApiScope/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteApiScope = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/ApiScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetFrontendScopes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/FrontendScope")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateFrontendScope = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/FrontendScope")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetFrontendScopeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/FrontendScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateFrontendScope = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/FrontendScope/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteFrontendScope = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/FrontendScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetFrontendScopePermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/FrontendScopePermission")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateFrontendScopePermission = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/FrontendScopePermission")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetFrontendScopePermissionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/FrontendScopePermission/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateFrontendScopePermission = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/FrontendScopePermission/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteFrontendScopePermission = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/FrontendScopePermission/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoleApiScopes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RoleApiScope")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateRoleApiScope = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/RoleApiScope")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoleApiScopeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RoleApiScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateRoleApiScope = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/RoleApiScope/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteRoleApiScope = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/RoleApiScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoleFrontendScopes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RoleFrontendScope")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateRoleFrontendScope = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/RoleFrontendScope")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRoleFrontendScopeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/RoleFrontendScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateRoleFrontendScope = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/RoleFrontendScope/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteRoleFrontendScope = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/RoleFrontendScope/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetAssignments = function (locationId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId,
                    "startDate": startDate,
                    "endDate": endDate
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Assignments")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateAssignment = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Assignments")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetAssignmentById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Assignments/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateAssignment = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/Assignments/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.ExpireAssignment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Assignments/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteAssignment = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/Assignments/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRegions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/regions")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateRegion = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/regions")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetRegionById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/regions/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateRegion = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/regions/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteRegion = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/regions/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLocations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/locations")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateLocation = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/locations")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLocationById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/locations/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateLocation = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/locations/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteLocation = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/locations/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetSheriffs = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/sheriffs")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateSheriff = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/sheriffs")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetSheriffById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/sheriffs/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateSheriff = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/sheriffs/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteSheriff = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/sheriffs/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetCourtrooms = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/courtrooms")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateCourtroom = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/courtrooms")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetCourtroomById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/courtrooms/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateCourtroom = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/courtrooms/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteCourtroom = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/courtrooms/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetJailRoleCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/jailroles")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetOtherAssignCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/otherassign")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetWorkSectionCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/worksection")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetSheriffRankCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/sheriffrank")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetEscortRuns = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/escort-runs")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateEscortRun = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/escort-runs")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetEscortRunById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/escort-runs/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateEscortRun = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/escort-runs/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteEscortRun = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/escort-runs/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetShifts = function (locationId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Shifts")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateShift = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Shifts")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetShiftById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Shifts/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateShift = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/Shifts/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteShift = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/Shifts/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateMultipleShifts = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Shifts/multiple")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CopyShifts = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Shifts/copy")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetDutyRecurrences = function (startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "startDate": startDate,
                    "endDate": endDate
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/DutyRecurrences")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateDutyRecurrence = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/DutyRecurrences")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetDutyRecurrenceById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/DutyRecurrences/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateDutyRecurrence = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/DutyRecurrences/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.ExpireDutyRecurrence = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/DutyRecurrences/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteDutyRecurrence = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/DutyRecurrences/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetDuties = function (locationId, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            var _this = this;
            return __generator(this, function (_a) {
                params = {
                    "locationId": locationId,
                    "startDate": startDate,
                    "endDate": endDate
                };
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Duty")
                                        .query(params)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateDuty = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Duty")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetDutyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/Duty/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateDuty = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/Duty/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteDuty = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/Duty/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.ImportDefaultDuties = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/Duty/import")
                                        .send(body)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetSheriffDuties = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/SheriffDuty")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateSheriffDuty = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/SheriffDuty")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetSheriffDutyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/SheriffDuty/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateSheriffDuty = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/SheriffDuty/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteSheriffDuty = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/SheriffDuty/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.AutoAssignSheriffDuties = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/SheriffDuty/auto-assign")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLeaves = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/leaves")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.CreateLeave = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.post("/leaves")
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLeaveById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/leaves/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.UpdateLeave = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.put("/leaves/" + id)
                                        .send(model)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.DeleteLeave = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.delete("/leaves/" + id)];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLeaveCancelReasonCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/leave-cancel")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLeaveTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/leave-type")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetLeaveSubCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/leave-sub-type")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetCourtRoleCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/courtroles")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    Client.prototype.GetGenderCodes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.tryRequest(function () { return __awaiter(_this, void 0, void 0, function () {
                        var response;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.agent.get("/codes/gender")];
                                case 1:
                                    response = _a.sent();
                                    return [2 /*return*/, response];
                            }
                        });
                    }); })];
            });
        });
    };
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=../../src/dist/client/Client.js.map