import moment from 'moment';
export type DateType = string | Date | moment.Moment | number;
export type TimeType = string | number | moment.Moment;
export type TimeRange = { startTime: TimeType, endTime: TimeType };