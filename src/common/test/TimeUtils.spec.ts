import { toTimeString, TIME_FORMAT_TZ, TIME_FORMAT_NO_TZ, setTime, fromTimeString } from '../TimeUtils';
import moment, { Moment, utc } from 'moment';
import { DateType } from '../../client/ExtendedClient';

describe('time utils', () => {
    describe('toTimeString', () => {
        const util = toTimeString;
        let currentMoment: Moment;
        let expectedTime: string;
        beforeEach(() => {
            currentMoment = moment();
            expectedTime = currentMoment.format(TIME_FORMAT_TZ);
        })

        it('should convert from moment', () => {
            expect(util(currentMoment)).toEqual(expectedTime);
        });

        it('should convert from number using local timezone', () => {
            expect(util(currentMoment.unix())).toEqual(expectedTime);
        });

        it('should add client timezone to time with  no timezone', () => {
            expect(util(currentMoment.format(TIME_FORMAT_NO_TZ))).toEqual(expectedTime);
        });

        it('should respect timezone if present', () => {
            const timeString = "11:30:00-07:00";
            expect(util(timeString)).toEqual(timeString);
        });

        it('Should work with dates', () => {
            const timeString = "2018-05-29T17:00:00.000Z";
            expect(util(timeString)).toEqual("10:00:00-07:00")
        })
    })

    describe('fromTimeString',()=>{
        it('Should respect timezone info',()=>{
            const returnMoment = fromTimeString('10:00:00-07');
            expect(returnMoment.utcOffset()).toEqual(-420);
        });
    })

    describe('setTime', () => {
        const util = setTime;

        // Set default time to 14:00 in UTC which is 7 am
        const originalDateTimeParts = {
            year: 2018,
            month: 6,
            day: 10,
            hour: 0,
            minute: 0,
            second: 0,
            ms: 0
        }
        const { year, month, day, hour, minute, second } = originalDateTimeParts;
        const originalDateTime = moment().utc().set({ ...originalDateTimeParts });

        it('Setting time in UTC should work', () => {
            const timeToTest = moment(originalDateTime);
            const newTime = moment().utc().set({
                ...originalDateTimeParts,
                hour: 14,
                minute: 30
            })
            const newMoment = util(timeToTest, newTime);
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString())
        });

        it('Setting time in UTC should work even if its midnight', () => {
            const timeToTest = moment(originalDateTime).set({ hours: 0 });
            const newTime = moment().utc().set({
                ...originalDateTimeParts,
                hour: 14,
                minute: 30
            })
            const newMoment = util(timeToTest, newTime);

            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString())
        });

        it('Setting time in timezone offset should work', () => {
            const newHour = 4;
            const newMin = 30;
            const timeToTest = moment(originalDateTime);
            const newTime = moment(timeToTest)
                .utcOffset(-420)
                .set({
                    hour: newHour,
                    minute: newMin
                });
            const newMoment = util(originalDateTime, newTime);
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString())
        });

        it('Setting time in timezone offset should work at midnight', () => {
            const newHour = 4;
            const newMin = 30;
            const timeToTest = moment(originalDateTime).set({ hour: 0 });
            const newTime = moment(timeToTest)
                .utcOffset(-420)
                .set({
                    hour: newHour,
                    minute: newMin
                });
            const newMoment = util(originalDateTime, newTime);
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString())
        });

        it('Setting time in timezone offset should work when utc date time and new time fall on different days', () => {
            const timeToTest = moment(originalDateTimeParts).set({hour:18}).utc();
            const newTime = moment(originalDateTimeParts).set({hour:16});
            const newMoment = util(timeToTest,newTime);
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });


        it('Setting time using time string should work', () => {
            const timeToTest = moment(originalDateTimeParts).set({hour:18}).utc();
            const newTime = moment(originalDateTimeParts).set({hour:10});
            const newMoment = util(timeToTest,"10:00:00-07");
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });

        it('Setting time using late time string should bump day', () => {
            const timeToTest = moment(originalDateTimeParts).set({hour:12}).utc();
            const newTime = moment(originalDateTimeParts).set({hour:22});
            const newMoment = util(timeToTest,"22:00:00-07");
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });
        


    })

})