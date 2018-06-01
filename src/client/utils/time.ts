import moment, { Moment, isMoment } from "moment";

export const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export const TIME_FORMAT_TZ = `${TIME_FORMAT_NO_TZ}Z`;

export function toTimeString(time: Moment | string | number | Date | undefined) {
    let timeMoment: Moment = moment();
    if (typeof time === typeof 'string') {        
        timeMoment = moment(time, [moment.ISO_8601,TIME_FORMAT_NO_TZ, TIME_FORMAT_TZ]);
    } else if (typeof time === typeof 0) {
        timeMoment = moment.unix(time as number);
    } else {
        timeMoment = moment(time);
    }
    return timeMoment.format(TIME_FORMAT_TZ);
}