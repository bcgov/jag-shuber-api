import moment from 'moment';
export declare type DateType = string | Date | moment.Moment | number;
export declare type TimeType = string | number | moment.Moment;
export declare type TimeRange = {
    startTime: TimeType;
    endTime: TimeType;
};
