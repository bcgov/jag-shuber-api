import moment from 'moment';

import { SYSTEM_USER_DISPLAY_NAME } from '../authentication';

export const createdDtm = moment(new Date()).toISOString();
export const updatedDtm = moment(new Date()).toISOString();
export const createdBy = SYSTEM_USER_DISPLAY_NAME;
export const updatedBy = SYSTEM_USER_DISPLAY_NAME;

// Auth
export * from './auth';
// Assignment Types
export * from './assignmentTypes';











