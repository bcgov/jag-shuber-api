import { toTimeString, TIME_FORMAT_TZ, TIME_FORMAT_NO_TZ } from '../time';
import moment, { Moment } from 'moment';

describe('time utils', () => {
    describe('toTimeString', () => {
        const util = toTimeString;
        let currentMoment:Moment;
        let expectedTime:string;
        beforeEach(()=>{
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

        it('Should work with dates',()=>{
            const timeString = "2018-05-29T17:00:00.000Z";
            expect(util(timeString)).toEqual("10:00:00-07:00")
        })
    })

})