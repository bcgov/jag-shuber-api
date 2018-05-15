import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';
import db from '../../db/Database';
import ExtendedClient from '../ExtendedClient';

expect.extend({
    toMatchShapeOf,
    toMatchOneOf
});

export default class TestUtils {
    private static tablesToClear = [
        'sheriff_duty',
        'duty',
        'duty_recurrence',
        'assignment',
        'courtroom',
        'run',
        'sheriff',
        'shift',
        'courthouse',
        'region'
    ]
    constructor() {

    }

    static getClient(): ExtendedClient {
        return new ExtendedClient('http://localhost:3000/api/v1');
    }

    static async clearDatabase() {
        const client = await db.getClient();
        await db.transaction(async (client) => {
            await TestUtils.tablesToClear.forEach(async (table) => {
                await client.query(`DELETE FROM ${table};`)
            });
        })
    }

    static randomString(length: number) {
        let str = "";
        for (let i = 0; i < length; ++i) {
            str = `${str}${String.fromCharCode(65 + (Math.random() * 25))}`
        }
        return str;
    }
}