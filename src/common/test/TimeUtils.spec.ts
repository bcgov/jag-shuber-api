import { toTimeString, TIME_FORMAT_TZ, TIME_FORMAT_NO_TZ, setTime, fromTimeString, doTimeRangesOverlap, isTimeWithin, normalizeTimeRange, areTimeRangesSame } from '../TimeUtils';
import moment, { Moment, utc } from 'moment';
import { TimeRange } from '../types';
import '../../support/MomentMatchers';

describe('time utils', () => {
    const blankTime: moment.MomentSetObject = {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }

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
    });

    describe('fromTimeString', () => {
        it('Should respect timezone info', () => {
            const returnMoment = fromTimeString('10:00:00-07');
            expect(returnMoment.utcOffset()).toEqual(-420);
        });
    });

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
            const timeToTest = moment(originalDateTimeParts).set({ hour: 18 }).utc();
            const newTime = moment(originalDateTimeParts).set({ hour: 16 });
            const newMoment = util(timeToTest, newTime);
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });


        it('Setting time using time string should work', () => {
            const timeToTest = moment(originalDateTimeParts).set({ hour: 18 }).utc();
            const newTime = moment(originalDateTimeParts).set({ hour: 10 });
            const newMoment = util(timeToTest, "10:00:00-07");
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });

        it('Setting time using late time string should bump day', () => {
            const timeToTest = moment(originalDateTimeParts).set({ hour: 12 }).utc();
            const newTime = moment(originalDateTimeParts).set({ hour: 22 });
            const newMoment = util(timeToTest, "22:00:00-07");
            expect(newMoment.toISOString()).toEqual(moment(newTime).toISOString());
        });
    });

    describe('normalizeTimeRange',()=>{
        const util = normalizeTimeRange;
        it('should not change valid TimeRange',()=>{
            const range :TimeRange={
                startTime:moment().set({...blankTime,hour:13}),
                endTime:moment().set({...blankTime,hour:14})
            }
            const newRange = util(range);
            expect(newRange.startTime).momentIsSame(range.startTime);
            expect(newRange.endTime).momentIsSame(range.endTime);            
        });
        it('should flip invalid TimeRange',()=>{
            const range :TimeRange={
                startTime:moment().set({...blankTime,hour:14}),
                endTime:moment().set({...blankTime,hour:13})
            }
            const newRange = util(range);
            expect(newRange.startTime).momentIsSame(range.endTime);
            expect(newRange.endTime).momentIsSame(range.startTime);            
        });
    })

    describe('isTimeWithin', () => {
        const util = isTimeWithin;
        const range: TimeRange = {
            startTime: moment().set({ ...blankTime, hour: 13 }),
            endTime: moment().set({ ...blankTime, hour: 16 })
        }
        const insideTime = moment().set({...blankTime,hour:14});
        const outsideTime = moment().set({...blankTime,hour:17});

        it('should return true if time is within range', () => {
            expect(util(insideTime,range)).toEqual(true);
        });

        it('should return false if time is outside range', () => {
            expect(util(outsideTime,range)).toEqual(false);
        });

        it('should respect inclusivity',()=>{
            // Start test
            expect(util(range.startTime,range)).toEqual(false);
            expect(util(range.startTime,range,"[)")).toEqual(true);
            expect(util(range.startTime,range,"(]")).toEqual(false);

            // End Test
            expect(util(range.endTime,range)).toEqual(false);
            expect(util(range.endTime,range,"[)")).toEqual(false);
            expect(util(range.endTime,range,"(]")).toEqual(true);
        })
        it('should work even if time range is backwards (i.e. start after end)', () => {
            const backwardsRange :TimeRange = {
                startTime:range.endTime,
                endTime:range.startTime
            };

            expect(util(insideTime,backwardsRange)).toEqual(true);
            expect(util(outsideTime,backwardsRange)).toEqual(false);
        });
    });
    describe('areTimeRangesSame', () => {
        const util = areTimeRangesSame;
        const range: TimeRange = {
            startTime: moment().set({ ...blankTime, hour: 13 }),
            endTime: moment().set({ ...blankTime, hour: 16 })
        }

        it('should return true if time ranges are the same', () => {
            const otherRange :TimeRange= {
                startTime:moment(range.startTime),
                endTime:moment(range.endTime)
            }
            expect(util(range,otherRange)).toEqual(true);
        });

        it('should return true if time ranges are the same but unnormalized', () => {
            const otherRange :TimeRange= {
                startTime:moment(range.endTime),
                endTime:moment(range.startTime)
            }
            expect(util(range,otherRange)).toEqual(true);
            expect(util(otherRange,range)).toEqual(true);
        });

        it('should return false if start times are different', () => {
            const otherRange :TimeRange= {
                startTime:moment(range.startTime).add(15,'minute'),
                endTime:moment(range.endTime)
            }
            expect(util(range,otherRange)).toEqual(false);
        });

        it('should return false if end times are different', () => {
            const otherRange :TimeRange= {
                startTime:moment(range.startTime),
                endTime:moment(range.endTime).add(15,'minute')
            }
            expect(util(range,otherRange)).toEqual(false);
        });
    });

    describe('doTimeRangesOverlap() ', () => {
        const util = doTimeRangesOverlap;

        const onePM = moment().hour(13).minute(0).second(0).millisecond(0).toISOString();
        const twoPM = moment().hour(14).minute(0).second(0).millisecond(0).toISOString();
        const threePM = moment().hour(15).minute(0).second(0).millisecond(0).toISOString();
        const fourPM = moment().hour(16).minute(0).second(0).millisecond(0).toISOString();

        /* tslint:disable:max-line-length */
        it(
            'Should return true if the start time or end time of time range one is between the start and end time of time range two',
            () => {
                expect(util({ startTime: onePM, endTime: threePM }, { startTime: twoPM, endTime: fourPM })).toBeTruthy();
            }
        );

        it(
            'Should return true if start times of each time range are equal and the end time of time range two is between the start and end of time range one',
            () => {
                expect(util({ startTime: onePM, endTime: threePM }, { startTime: onePM, endTime: twoPM })).toBeTruthy();
            }
        );

        it(
            'Should return true if start times of each time range are equal and the end time of time range one is between the start and end of time range two',
            () => {
                expect(util({ startTime: onePM, endTime: twoPM }, { startTime: onePM, endTime: threePM })).toBeTruthy();
            }
        );

        it(
            'Should return true if end times of each time range are equal and the start time of time range one is between the start and end of time range two',
            () => {
                expect(util({ startTime: twoPM, endTime: threePM }, { startTime: onePM, endTime: threePM })).toBeTruthy();
            }
        );

        it(
            'Should return true if end times of each time range are equal and the start time of time range two is between the start and end of time range one',
            () => {
                expect(util({ startTime: onePM, endTime: threePM }, { startTime: twoPM, endTime: threePM })).toBeTruthy();
            }
        );

        it(
            'Should return true if time ranges are the same',
            () => {
                expect(util({ startTime: onePM, endTime: threePM }, { startTime: onePM, endTime: threePM })).toBeTruthy();
            }
        );

        it(
            'Should return false if the end time of time range one is the same as the start time of time range two',
            () => {
                expect(util({ startTime: onePM, endTime: threePM }, { startTime: threePM, endTime: fourPM })).toBeFalsy();
            }
        );

        it(
            'Should return false if time range one is before time range two',
            () => {
                expect(util({ startTime: onePM, endTime: twoPM }, { startTime: threePM, endTime: fourPM })).toBeFalsy();
            }
        );

        it(
            'Should return false if time range one after is after time range two',
            () => {
                expect(util({ startTime: threePM, endTime: fourPM }, { startTime: onePM, endTime: twoPM })).toBeFalsy();
            }
        );

        it(
            'Should return true if the start of time range one is after the start of time range two and the end of time range one is before the end of time range two',
            () => {
                expect(util({ startTime: twoPM, endTime: threePM }, { startTime: onePM, endTime: fourPM })).toBeTruthy();
            }
        );

        it(
            'Should return true if the start of time range two is after the start of time range one and the end of time range two is before the end of time range one',
            () => {
                expect(util({ startTime: onePM, endTime: fourPM }, { startTime: twoPM, endTime: threePM })).toBeTruthy();
            }
        );

    });
})