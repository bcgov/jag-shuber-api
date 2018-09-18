import { Moment } from 'moment';
export type DateType = string | Date | Moment | number;
export type TimeType = string | number | Moment;
export type TimeRange = { startTime: TimeType, endTime: TimeType };