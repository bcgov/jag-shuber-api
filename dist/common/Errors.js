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
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError;
(function (ValidationError) {
    ValidationError.Validation_Error_Name = "ValidateError";
    function decorate(err) {
        err.name = ValidationError.Validation_Error_Name;
    }
    ValidationError.decorate = decorate;
})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));
function isValidationError(err) {
    var _a = err.name, name = _a === void 0 ? "" : _a;
    return name === ValidationError.Validation_Error_Name;
}
exports.isValidationError = isValidationError;
var DatabaseError;
(function (DatabaseError) {
    DatabaseError.DATABASE_ERROR_TYPE_NAME = "DATABASE_ERROR";
    DatabaseError.PG_ERROR_23505_REGEX = /Key\s\((\w*)\)\=\((\w*)\)/;
    function decorate(err) {
        err.type = DatabaseError.DATABASE_ERROR_TYPE_NAME;
    }
    DatabaseError.decorate = decorate;
})(DatabaseError = exports.DatabaseError || (exports.DatabaseError = {}));
function isDatabaseError(err) {
    var _a = err.type, type = _a === void 0 ? "" : _a;
    return type === DatabaseError.DATABASE_ERROR_TYPE_NAME;
}
exports.isDatabaseError = isDatabaseError;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(error) {
        var _this = _super.call(this) || this;
        var message = error.message, stack = error.stack, response = error.response;
        _this.message = message;
        _this.stack = stack;
        // If there is http response in error
        if (response) {
            var _a = response.body, body_1 = _a === void 0 ? {} : _a, httpError = response.error;
            if (httpError) {
                _this.httpError = httpError;
                _this.status = httpError.status;
            }
            // Clones all of the values in the body object into this error
            Object.keys(body_1).forEach(function (key) {
                _this[key] = JSON.parse(JSON.stringify(body_1[key]));
            });
        }
        return _this;
    }
    return ApiError;
}(Error));
exports.ApiError = ApiError;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/common/Errors.js.map