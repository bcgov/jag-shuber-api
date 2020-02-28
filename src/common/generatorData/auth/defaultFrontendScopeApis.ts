import { createdDtm, updatedDtm, createdBy, updatedBy } from '../index';

import { FrontendScopeApi } from '../../../models/FrontendScopeApi';

/**
 * IMPORTANT! DO NOT REMOVE! These scopes MUST EXIST IN THE SYSTEM to allow frontend application components to display
 * and are populated into the database automatically if they don't exist.
 */
export const defaultFrontendScopeApis: FrontendScopeApi[] = [
   /**
    * @api
    */
    {
        id: null, // TODO: We will assign this when we map over the scope
        frontendScopeCode: '', // Code type for the scope, only used when generating scopes
        apiScopeCode: '', // Code type for the scope, only used when generating scopes
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdDtm: createdDtm,
        updatedDtm: updatedDtm,
        revisionCount: 0
    },
];
