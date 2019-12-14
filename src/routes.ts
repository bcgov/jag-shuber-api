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

Routes are generated from models and controllers
*/

/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { Container, Provider } from 'typescript-ioc';
import { CurrentUser } from './infrastructure/CurrentUser';
import { AssignmentController } from './controllers/AssignmentController';
import { RegionController } from './controllers/RegionController';
import { LocationController } from './controllers/LocationController';
import { SheriffController } from './controllers/SheriffController';
import { CourtroomController } from './controllers/CourtroomController';
import { JailRoleCodesController } from './controllers/JailRoleCodesController';
import { OtherAssignCodesController } from './controllers/OtherAssignCodesController';
import { WorkSectionCodesController } from './controllers/WorkSectionCodesController';
import { SheriffRankCodesController } from './controllers/SheriffRankCodesController';
import { EscortRunController } from './controllers/EscortRunController';
import { ShiftController } from './controllers/ShiftController';
import { DutyRecurrenceController } from './controllers/DutyRecurrenceController';
import { DutyController } from './controllers/DutyController';
import { SheriffDutyController } from './controllers/SheriffDutyController';
import { LeaveController } from './controllers/LeaveController';
import { LeaveCancelCodesController } from './controllers/LeaveCancelCodesController';
import { LeaveTypeCodesController } from './controllers/LeaveTypeCodesController';
import { LeaveSubTypeCodesController } from './controllers/LeaveSubTypeCodesController';
import { CourtRoleCodesController } from './controllers/CourtRoleCodesController';
import { GenderCodesController } from './controllers/GenderCodesController';
import { TokenController } from './controllers/TokenController';
import { UserController } from './controllers/UserController';
import { UserRoleController } from './controllers/UserRoleController';
import { RoleController } from './controllers/RoleController';
import { RolePermissionController } from './controllers/RolePermissionController';
import { ApiScopeController } from './controllers/ApiScopeController';
import { FrontendScopeController } from './controllers/FrontendScopeController';
import { FrontendScopePermissionController } from './controllers/FrontendScopePermissionController';
import { RoleApiScopeController } from './controllers/RoleApiScopeController';
import { RoleFrontendScopeController } from './controllers/RoleFrontendScopeController';
import { koaAuthentication } from './authentication';

const models: TsoaRoute.Models = {
    "DutyRecurrence": {
        "properties": {
            "id": { "dataType": "string" },
            "startTime": { "dataType": "string", "required": true },
            "endTime": { "dataType": "string", "required": true },
            "daysBitmap": { "dataType": "double", "required": true },
            "sheriffsRequired": { "dataType": "double", "required": true },
            "assignmentId": { "dataType": "string" },
        },
    },
    "Assignment": {
        "properties": {
            "id": { "dataType": "string" },
            "title": { "dataType": "string" },
            "workSectionId": { "dataType": "string", "required": true },
            "locationId": { "dataType": "string", "required": true },
            "courtroomId": { "dataType": "string" },
            "courtRoleId": { "dataType": "string" },
            "escortRunId": { "dataType": "string" },
            "jailRoleCode": { "dataType": "string" },
            "otherAssignCode": { "dataType": "string" },
            "dutyRecurrences": { "dataType": "array", "array": { "ref": "DutyRecurrence" } },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
        },
    },
    "Region": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string" },
            "name": { "dataType": "string", "required": true },
            "location": { "dataType": "any" },
        },
    },
    "Location": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "parentLocationId": { "dataType": "string" },
            "regionId": { "dataType": "string", "required": true },
        },
    },
    "Sheriff": {
        "properties": {
            "id": { "dataType": "string" },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "badgeNo": { "dataType": "string", "required": true },
            "imageUrl": { "dataType": "string" },
            "homeLocationId": { "dataType": "string", "required": true },
            "currentLocationId": { "dataType": "string" },
            "rankCode": { "dataType": "string", "required": true },
            "alias": { "dataType": "string" },
            "genderCode": { "dataType": "string" },
        },
    },
    "Courtroom": {
        "properties": {
            "id": { "dataType": "string" },
            "code": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "locationId": { "dataType": "string", "required": true },
        },
    },
    "JailRoleCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "OtherAssignCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "WorkSectionCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "SheriffRankCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
            "order": { "dataType": "double", "required": true },
        },
    },
    "EscortRun": {
        "properties": {
            "id": { "dataType": "string" },
            "title": { "dataType": "string", "required": true },
            "locationId": { "dataType": "string", "required": true },
        },
    },
    "Shift": {
        "properties": {
            "id": { "dataType": "string" },
            "workSectionId": { "dataType": "string" },
            "locationId": { "dataType": "string", "required": true },
            "sheriffId": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
            "assignmentId": { "dataType": "string" },
        },
    },
    "MultipleShiftUpdateRequest": {
        "properties": {
            "shiftIds": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "sheriffId": { "dataType": "string" },
            "startTime": { "dataType": "string" },
            "endTime": { "dataType": "string" },
            "workSectionId": { "dataType": "string" },
            "assignmentId": { "dataType": "string" },
        },
    },
    "ShiftCopyOptions": {
        "properties": {
            "shouldIncludeSheriffs": { "dataType": "boolean", "required": true },
            "startOfWeekSource": { "dataType": "string", "required": true },
            "startOfWeekDestination": { "dataType": "string", "required": true },
            "locationId": { "dataType": "string", "required": true },
        },
    },
    "SheriffDuty": {
        "properties": {
            "id": { "dataType": "string" },
            "sheriffId": { "dataType": "string" },
            "dutyId": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
        },
    },
    "Duty": {
        "properties": {
            "id": { "dataType": "string" },
            "startDateTime": { "dataType": "string", "required": true },
            "endDateTime": { "dataType": "string", "required": true },
            "assignmentId": { "dataType": "string", "required": true },
            "dutyRecurrenceId": { "dataType": "string" },
            "sheriffDuties": { "dataType": "array", "array": { "ref": "SheriffDuty" } },
            "comments": { "dataType": "string" },
        },
    },
    "DutyImportDefaultsRequest": {
        "properties": {
            "locationId": { "dataType": "string", "required": true },
            "date": { "dataType": "string" },
        },
    },
    "SheriffDutyAutoAssignRequest": {
        "properties": {
            "locationId": { "dataType": "string", "required": true },
            "date": { "dataType": "string" },
        },
    },
    "Leave": {
        "properties": {
            "id": { "dataType": "string" },
            "sheriffId": { "dataType": "string", "required": true },
            "leaveCode": { "dataType": "string", "required": true },
            "leaveSubCode": { "dataType": "string", "required": true },
            "startDate": { "dataType": "string", "required": true },
            "endDate": { "dataType": "string" },
            "startTime": { "dataType": "string" },
            "endTime": { "dataType": "string" },
            "isPartial": { "dataType": "double", "required": true },
            "comment": { "dataType": "string" },
            "cancelDate": { "dataType": "string" },
            "cancelReasonCode": { "dataType": "string" },
        },
    },
    "LeaveCancelReasonCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "LeaveCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "LeaveSubCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "subCode": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "CourtRoleCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "GenderCode": {
        "properties": {
            "code": { "dataType": "string", "required": true },
            "description": { "dataType": "string", "required": true },
            "expiryDate": { "dataType": "string" },
        },
    },
    "User": {
        "properties": {
            "id": { "dataType": "string" },
            "displayName": { "dataType": "string" },
            "defaultLocationId": { "dataType": "string" },
            "systemAccountInd": { "dataType": "double" },
            "sheriffId": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "UserRole": {
        "properties": {
            "id": { "dataType": "string" },
            "userId": { "dataType": "string" },
            "roleId": { "dataType": "string" },
            "effectiveDate": { "dataType": "string" },
            "expiryDate": { "dataType": "string" },
            "locationId": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "Role": {
        "properties": {
            "id": { "dataType": "string" },
            "roleName": { "dataType": "string" },
            "roleCode": { "dataType": "string" },
            "systemCodeInd": { "dataType": "double" },
            "description": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "RoleApiScope": {
        "properties": {
            "id": { "dataType": "string" },
            "roleId": { "dataType": "string" },
            "scopeId": { "dataType": "string" },
            "rolePermissions": { "dataType": "array", "array": { "dataType": "object" }, "required": true },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "RoleFrontendScope": {
        "properties": {
            "id": { "dataType": "string" },
            "roleId": { "dataType": "string" },
            "scopeId": { "dataType": "string" },
            "rolePermissions": { "dataType": "array", "array": { "dataType": "object" }, "required": true },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "RolePermission": {
        "properties": {
            "id": { "dataType": "string" },
            "roleId": { "dataType": "string" },
            "roleApiScopeId": { "dataType": "string" },
            "roleApiScope": { "ref": "RoleApiScope" },
            "roleFrontendScopeId": { "dataType": "string" },
            "roleFrontendScope": { "ref": "RoleFrontendScope" },
            "apiScopePermissionId": { "dataType": "string" },
            "frontendScopePermissionId": { "dataType": "string" },
            "displayName": { "dataType": "string" },
            "description": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "ApiScope": {
        "properties": {
            "id": { "dataType": "string" },
            "scopeName": { "dataType": "string" },
            "scopeCode": { "dataType": "string" },
            "systemCodeInd": { "dataType": "boolean" },
            "description": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "FrontendScope": {
        "properties": {
            "id": { "dataType": "string" },
            "scopeName": { "dataType": "string" },
            "scopeCode": { "dataType": "string" },
            "systemCodeInd": { "dataType": "boolean" },
            "description": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
    "FrontendScopePermission": {
        "properties": {
            "id": { "dataType": "string" },
            "frontendScopeId": { "dataType": "string" },
            "permissionCode": { "dataType": "string" },
            "displayName": { "dataType": "string" },
            "description": { "dataType": "string" },
            "createdBy": { "dataType": "string" },
            "updatedBy": { "dataType": "string" },
            "createdDtm": { "dataType": "string" },
            "updatedDtm": { "dataType": "string" },
            "revisionCount": { "dataType": "double" },
        },
    },
};

export function RegisterRoutes(router: any) {
    router.get('/v1/Assignments',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
                startDate: { "in": "query", "name": "startDate", "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.getAssignments.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.getAssignmentById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Assignments',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Assignment" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.createAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Assignment" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.updateAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.expireAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Assignments/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(AssignmentController) as AssignmentController;

            const promise = controller.deleteAssignment.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/regions',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RegionController) as RegionController;

            const promise = controller.getRegions.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RegionController) as RegionController;

            const promise = controller.getRegionById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/regions',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Region" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RegionController) as RegionController;

            const promise = controller.createRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Region" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RegionController) as RegionController;

            const promise = controller.updateRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/regions/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RegionController) as RegionController;

            const promise = controller.deleteRegion.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/locations',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LocationController) as LocationController;

            const promise = controller.getLocations.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/locations/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LocationController) as LocationController;

            const promise = controller.getLocationById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/locations',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Location" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LocationController) as LocationController;

            const promise = controller.createLocation.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/locations/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Location" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LocationController) as LocationController;

            const promise = controller.updateLocation.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/locations/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LocationController) as LocationController;

            const promise = controller.deleteLocation.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/sheriffs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffController) as SheriffController;

            const promise = controller.getSheriffs.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffController) as SheriffController;

            const promise = controller.getSheriffById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/sheriffs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Sheriff" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffController) as SheriffController;

            const promise = controller.createSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Sheriff" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffController) as SheriffController;

            const promise = controller.updateSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/sheriffs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffController) as SheriffController;

            const promise = controller.deleteSheriff.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courtrooms',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtroomController) as CourtroomController;

            const promise = controller.getCourtrooms.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtroomController) as CourtroomController;

            const promise = controller.getCourtroomById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/courtrooms',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Courtroom" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtroomController) as CourtroomController;

            const promise = controller.createCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Courtroom" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtroomController) as CourtroomController;

            const promise = controller.updateCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/courtrooms/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtroomController) as CourtroomController;

            const promise = controller.deleteCourtroom.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/jailroles',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(JailRoleCodesController) as JailRoleCodesController;

            const promise = controller.getJailRoleCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/otherassign',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(OtherAssignCodesController) as OtherAssignCodesController;

            const promise = controller.getOtherAssignCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/worksection',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(WorkSectionCodesController) as WorkSectionCodesController;

            const promise = controller.getWorkSectionCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/sheriffrank',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffRankCodesController) as SheriffRankCodesController;

            const promise = controller.getSheriffRankCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/escort-runs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(EscortRunController) as EscortRunController;

            const promise = controller.getEscortRuns.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/escort-runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(EscortRunController) as EscortRunController;

            const promise = controller.getEscortRunById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/escort-runs',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "EscortRun" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(EscortRunController) as EscortRunController;

            const promise = controller.createEscortRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/escort-runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "EscortRun" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(EscortRunController) as EscortRunController;

            const promise = controller.updateEscortRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/escort-runs/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(EscortRunController) as EscortRunController;

            const promise = controller.deleteEscortRun.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Shifts',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.getShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Shifts/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.getShiftById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Shift" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.createShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Shifts/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Shift" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.updateShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Shifts/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.deleteShift.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts/multiple',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "MultipleShiftUpdateRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.updateMultipleShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Shifts/copy',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "ShiftCopyOptions" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ShiftController) as ShiftController;

            const promise = controller.copyShifts.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/DutyRecurrences',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                startDate: { "in": "query", "name": "startDate", "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.getDutyRecurrences.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.getDutyRecurrenceById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/DutyRecurrences',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "DutyRecurrence" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.createDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "DutyRecurrence" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.updateDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.expireDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/DutyRecurrences/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyRecurrenceController) as DutyRecurrenceController;

            const promise = controller.deleteDutyRecurrence.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Duty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                locationId: { "in": "query", "name": "locationId", "dataType": "string" },
                startDate: { "in": "query", "name": "startDate", "dataType": "string" },
                endDate: { "in": "query", "name": "endDate", "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.getDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.getDutyById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Duty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Duty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.createDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Duty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.updateDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Duty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.deleteDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Duty/import',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                body: { "in": "body", "name": "body", "required": true, "ref": "DutyImportDefaultsRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(DutyController) as DutyController;

            const promise = controller.importDefaultDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/SheriffDuty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.getSheriffDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/SheriffDuty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.getSheriffDutyById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/SheriffDuty',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "SheriffDuty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.createSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/SheriffDuty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "SheriffDuty" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.updateSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/SheriffDuty/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.deleteSheriffDuty.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/SheriffDuty/auto-assign',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "SheriffDutyAutoAssignRequest" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(SheriffDutyController) as SheriffDutyController;

            const promise = controller.autoAssignSheriffDuties.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/leaves',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveController) as LeaveController;

            const promise = controller.getLeaves.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveController) as LeaveController;

            const promise = controller.getLeaveById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/leaves',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Leave" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveController) as LeaveController;

            const promise = controller.createLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Leave" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveController) as LeaveController;

            const promise = controller.updateLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/leaves/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveController) as LeaveController;

            const promise = controller.deleteLeave.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-cancel',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveCancelCodesController) as LeaveCancelCodesController;

            const promise = controller.getLeaveCancelReasonCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-type',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveTypeCodesController) as LeaveTypeCodesController;

            const promise = controller.getLeaveTypes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/leave-sub-type',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(LeaveSubTypeCodesController) as LeaveSubTypeCodesController;

            const promise = controller.getLeaveSubCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/courtroles',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(CourtRoleCodesController) as CourtRoleCodesController;

            const promise = controller.getCourtRoleCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/codes/gender',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(GenderCodesController) as GenderCodesController;

            const promise = controller.getGenderCodes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/token',
        authenticateMiddleware([{ "name": "siteminder" }]),
        async (context, next) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(TokenController) as TokenController;

            const promise = controller.getToken.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/token/delete',
        async (context, next) => {
            const args = {
                request: { "in": "request", "name": "request", "required": true, "dataType": "object" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(TokenController) as TokenController;

            const promise = controller.logout.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/User/me',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.getCurrentUser.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/User',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.getUsers.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/User/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.getUserById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/User',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "User" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.createUser.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/User/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "User" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.updateUser.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/User/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserController) as UserController;

            const promise = controller.deleteUser.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/UserRole/me',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.getCurrentUserRoles.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/UserRole',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.getUserRoles.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/UserRole/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.getUserRoleById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/UserRole',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "UserRole" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.createUserRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/UserRole/:id/expire',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "UserRole" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.expireUserRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/UserRole/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "UserRole" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.updateUserRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/UserRole/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(UserRoleController) as UserRoleController;

            const promise = controller.deleteUserRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Role',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleController) as RoleController;

            const promise = controller.getRoles.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/Role/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleController) as RoleController;

            const promise = controller.getRoleById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/Role',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "Role" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleController) as RoleController;

            const promise = controller.createRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/Role/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "Role" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleController) as RoleController;

            const promise = controller.updateRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/Role/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleController) as RoleController;

            const promise = controller.deleteRole.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RolePermission',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RolePermissionController) as RolePermissionController;

            const promise = controller.getRolePermissions.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RolePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RolePermissionController) as RolePermissionController;

            const promise = controller.getRolePermissionById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/RolePermission',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "RolePermission" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RolePermissionController) as RolePermissionController;

            const promise = controller.createRolePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/RolePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "RolePermission" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RolePermissionController) as RolePermissionController;

            const promise = controller.updateRolePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/RolePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RolePermissionController) as RolePermissionController;

            const promise = controller.deleteRolePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/ApiScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ApiScopeController) as ApiScopeController;

            const promise = controller.getApiScopes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/ApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ApiScopeController) as ApiScopeController;

            const promise = controller.getApiScopeById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/ApiScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "ApiScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ApiScopeController) as ApiScopeController;

            const promise = controller.createApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/ApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "ApiScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ApiScopeController) as ApiScopeController;

            const promise = controller.updateApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/ApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(ApiScopeController) as ApiScopeController;

            const promise = controller.deleteApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/FrontendScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopeController) as FrontendScopeController;

            const promise = controller.getFrontendScopes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/FrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopeController) as FrontendScopeController;

            const promise = controller.getFrontendScopeById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/FrontendScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "FrontendScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopeController) as FrontendScopeController;

            const promise = controller.createFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/FrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "FrontendScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopeController) as FrontendScopeController;

            const promise = controller.updateFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/FrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopeController) as FrontendScopeController;

            const promise = controller.deleteFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/FrontendScopePermission',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopePermissionController) as FrontendScopePermissionController;

            const promise = controller.getFrontendScopePermissions.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/FrontendScopePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopePermissionController) as FrontendScopePermissionController;

            const promise = controller.getFrontendScopePermissionById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/FrontendScopePermission',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "FrontendScopePermission" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopePermissionController) as FrontendScopePermissionController;

            const promise = controller.createFrontendScopePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/FrontendScopePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "FrontendScopePermission" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopePermissionController) as FrontendScopePermissionController;

            const promise = controller.updateFrontendScopePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/FrontendScopePermission/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(FrontendScopePermissionController) as FrontendScopePermissionController;

            const promise = controller.deleteFrontendScopePermission.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RoleApiScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleApiScopeController) as RoleApiScopeController;

            const promise = controller.getRoleApiScopes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RoleApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleApiScopeController) as RoleApiScopeController;

            const promise = controller.getRoleApiScopeById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/RoleApiScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "RoleApiScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleApiScopeController) as RoleApiScopeController;

            const promise = controller.createRoleApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/RoleApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "RoleApiScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleApiScopeController) as RoleApiScopeController;

            const promise = controller.updateRoleApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/RoleApiScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleApiScopeController) as RoleApiScopeController;

            const promise = controller.deleteRoleApiScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RoleFrontendScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleFrontendScopeController) as RoleFrontendScopeController;

            const promise = controller.getRoleFrontendScopes.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.get('/v1/RoleFrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleFrontendScopeController) as RoleFrontendScopeController;

            const promise = controller.getRoleFrontendScopeById.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.post('/v1/RoleFrontendScope',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                model: { "in": "body", "name": "model", "required": true, "ref": "RoleFrontendScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleFrontendScopeController) as RoleFrontendScopeController;

            const promise = controller.createRoleFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.put('/v1/RoleFrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
                model: { "in": "body", "name": "model", "required": true, "ref": "RoleFrontendScope" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleFrontendScopeController) as RoleFrontendScopeController;

            const promise = controller.updateRoleFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });
    router.delete('/v1/RoleFrontendScope/:id',
        authenticateMiddleware([{ "name": "jwt" }]),
        async (context, next) => {
            const args = {
                id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, context);
            } catch (error) {
                context.status = error.status || 500;
                context.body = error;
                return next();
            }

            // Create the currentUser from the context and bind it to the ioc container
            const currentUserProvider: Provider = {
                get: () => new CurrentUser(context.request.user)
            }
            Container.bind(CurrentUser).provider(currentUserProvider);
            // Using the typescript-ioc container, retrieve controller
            const controller = Container.get(RoleFrontendScopeController) as RoleFrontendScopeController;

            const promise = controller.deleteRoleFrontendScope.apply(controller, validatedArgs);
            return promiseHandler(controller, promise, context, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async (context: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                try {
                    const user = await koaAuthentication(context.request, secMethod.name, secMethod.scopes)
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        context.request['user'] = user;
                        return next();
                    }
                } catch (error) {
                    responded++;
                    // If no authentication was successful
                    if (responded == security.length && !success) {
                        context.throw(401, 'access_denied', `${error.message ? error.message : error}`);
                    }
                }
            }
        }
    }

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, next: () => Promise<any>) {
        return Promise.resolve(promise)
            .then((data: any) => {
                if (data || data === false) {
                    context.body = data;
                    context.status = 200;
                } else {
                    context.status = 204;
                }

                if (isController(controllerObj)) {
                    const headers = controllerObj.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        context.set(name, headers[name]);
                    });

                    const statusCode = controllerObj.getStatus();
                    if (statusCode) {
                        context.status = statusCode;
                    }
                }
                return next();
            })
            .catch((error: any) => {
                context.status = error.status || 500;
                context.body = error;
                return next();
            });
    }

    function getValidatedArgs(args: any, context: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return context.request;
                case 'query':
                    return ValidateParam(args[key], context.request.query[name], models, name, errorFields)
                case 'path':
                    return ValidateParam(args[key], context.params[name], models, name, errorFields)
                case 'header':
                    return ValidateParam(args[key], context.request.headers[name], models, name, errorFields);
                case 'body':
                    return ValidateParam(args[key], context.request.body, models, name, errorFields, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], context.request.body[name], models, name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}