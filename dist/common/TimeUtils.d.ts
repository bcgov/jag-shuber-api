import moment, { Moment } from 'moment';
export declare type DateType = Moment | string | number | Date | undefined;
export declare const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export declare const TIME_FORMAT_TZ: string;
export declare function toTimeString(time: DateType): string;
export declare function fromTimeString(timeString: string): Moment;
export declare function setTime(momentToSet: DateType, timeToSet: DateType): moment.Moment;
