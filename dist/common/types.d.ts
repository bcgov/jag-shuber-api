import { Moment } from 'moment';
export declare type DateType = string | Date | Moment | number;
export declare type TimeType = string | number | Moment;
export declare type TimeRange = {
    startTime: TimeType;
    endTime: TimeType;
};
