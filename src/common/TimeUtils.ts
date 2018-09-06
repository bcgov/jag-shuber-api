import moment, { Moment } from 'moment';
import { DateType } from './types';

export const TIME_FORMAT_NO_TZ = "HH:mm:ss";
export const TIME_FORMAT_TZ = `${TIME_FORMAT_NO_TZ}Z`;

export function toTimeString(time?: DateType) {
    let timeMoment: Moment = moment();
    if (typeof time === typeof 'string') {
        timeMoment = moment(time, [moment.ISO_8601, TIME_FORMAT_NO_TZ, TIME_FORMAT_TZ]);
    } else if (typeof time === typeof 0) {
        timeMoment = moment.unix(time as number);
    } else {
        timeMoment = moment(time);
    }
    return timeMoment.format(TIME_FORMAT_TZ);
}

export function fromTimeString(timeString: string): Moment {
    const returnMoment = moment.parseZone(timeString, [moment.ISO_8601, TIME_FORMAT_NO_TZ, TIME_FORMAT_TZ], true);
    if (!returnMoment.isValid()) {
        return moment.parseZone(timeString);
    } else {
        return returnMoment;
    }
}


export function setTime(momentToSet: DateType, timeToSet: DateType) {
    let timeMoment: Moment | undefined;
    if (typeof timeToSet === typeof "string") {
        timeMoment = fromTimeString(timeToSet as string);
    } else {
        // Parse the time moment with the timezone 
        timeMoment = moment.parseZone(timeToSet);
    }

    // Shift the moment that we want to alter into the same time offset
    const newMoment = moment(momentToSet)
        .utcOffset(timeMoment.utcOffset());

    // Then set the hours, mins, seconds and shift it back into utc
    return newMoment
        .set({
            hour: timeMoment.hours(),
            minute: timeMoment.minute(),
            seconds: timeMoment.seconds()
        }).utc();
}