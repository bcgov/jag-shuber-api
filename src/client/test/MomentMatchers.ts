import MatcherUtils = jest.MatcherUtils;
import moment, { Moment } from "moment";
import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'
import { toTimeString } from "..";

export declare type JestResult = {
    message: () => string;
    pass: boolean;
};

export function momentIsSame<T>(this: MatcherUtils, actual: T, expected: T): JestResult {
    const pass = moment(actual).isSame(moment(expected));
    return {
        message: () => pass ? '' :
            `${matcherHint('.momentIsSame')}\n` +
            `\n` +
            `Received:\n` +
            `  ${printReceived(actual)}\n` +
            `Expected:\n` +
            `  ${printExpected(expected)}\n`,
        pass,
    }
}

export function toBeSameTime<T extends string | Moment | number>(this: MatcherUtils, actual: T, expected: T): JestResult {
    const actualTime = toTimeString(actual);
    const expectedTime = toTimeString(expected);
    const pass = actualTime === expectedTime;
    return {
        message: () => pass ? '' :
            `${matcherHint('.toBeSameTime')}\n` +
            `\n` +
            `Received Time:\n` +
            `  ${printReceived(actualTime)}\n` +
            `Expected Time:\n` +
            `  ${printExpected(expectedTime)}\n` +
            `Received Value:\n` +
            `  ${actual}\n`,
        pass,
    }
}

const dateFormat = "YYYY-MM-DD";

export function toBeSameDate<T>(this: MatcherUtils, actual: T, expected: T): JestResult {
    
    const actualDate = moment(actual).format(dateFormat);
    const expectedDate = moment(expected).format(dateFormat)
    const pass = actualDate === expectedDate;
    return {
        message: () => pass ? '' :
            `${matcherHint('.toBeSameDate')}\n` +
            `\n` +
            `Received:\n` +
            `  ${printReceived(actualDate)}\n` +
            `Expected:\n` +
            `  ${printExpected(expectedDate)}\n` +
            `Value Received:\n` +
            ` ${expected}`,
        pass,
    }
}

declare global {
    namespace jest {
        interface Matchers<R> {
            momentIsSame(expected: Moment | string | number | undefined): R, // tslint:disable-line:no-any
            toBeSameTime(expected: Moment | string | number | undefined): R, // tslint:disable-line:no-any
            toBeSameDate(expected: Moment | string | number | undefined): R, // tslint:disable-line:no-any
        }
    }
}

expect.extend({
    momentIsSame,
    toBeSameTime,
    toBeSameDate
});