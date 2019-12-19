"use strict";
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
    const { name = "" } = err;
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
    const { type = "" } = err;
    return type === DatabaseError.DATABASE_ERROR_TYPE_NAME;
}
exports.isDatabaseError = isDatabaseError;
class ApiError extends Error {
    constructor(error) {
        super();
        const { message, stack, response } = error;
        this.message = message;
        this.stack = stack;
        // If there is http response in error
        if (response) {
            const { body = {}, error: httpError } = response;
            if (httpError) {
                this.httpError = httpError;
                this.status = httpError.status;
            }
            if (body) {
                // Clones all of the values in the body object into this error
                Object.keys(body).forEach(key => {
                    this[key] = JSON.parse(JSON.stringify(body[key]));
                });
            }
        }
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=../../src/dist/common/Errors.js.map