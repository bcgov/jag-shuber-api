import { Moment } from "moment";
export declare const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export declare const TIME_FORMAT_TZ: string;
export declare function toTimeString(time: Moment | string | number | undefined): string;
