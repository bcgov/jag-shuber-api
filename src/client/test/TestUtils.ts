import { toMatchShapeOf, toMatchOneOf } from 'jest-to-match-shape-of';
import db from '../../db/Database';
import { closeConnectionPool } from '../../db/connection';
import ExtendedClient from '../ExtendedClient';
import { Courthouse, Courtroom, Assignment, Region, DutyRecurrence, Duty, SheriffDuty, Shift, Leave } from '../models';
import { Sheriff } from '../../models/Sheriff';
import { ClientBase } from 'pg';
import '../../support/MomentMatchers';
import moment, { Moment } from 'moment';
import {
    SITEMINDER_HEADER_USERGUID,
    SITEMINDER_HEADER_USERDISPLAYNAME,
    SITEMINDER_HEADER_USERIDENTIFIER,
    SITEMINDER_HEADER_USERTYPE,
    TokenPayload
} from '../../common/authentication';
import { DatabaseService } from '../../infrastructure/DatabaseService';
import { AssignmentService } from '../../services/AssignmentService';
import { CourthouseService } from '../../services/CourthouseService';
import { SheriffDutyService } from '../../services/SheriffDutyService';
import { DatabaseRecordMetadata } from '../../infrastructure/DatabaseRecordMetadata';

expect.extend({
    toMatchShapeOf,
    toMatchOneOf
});

export interface DBRecordMetadata {
    updatedBy?: string;
    createdBy?: string;
    updatedDate?: string;
    createdDate?: string;
}

export default class TestUtils {
    public static tables = {
        sheriff_duty: 'sheriff_duty',
        duty: 'duty',
        duty_recurrence: 'duty_recurrence',
        assignment: 'assignment',
        courtroom: 'courtroom',
        run: 'run',
        shift: 'shift',
        sheriff: 'sheriff',
        courthouse: 'courthouse',
        region: 'region',
        leave: 'leave'
    }

    // Tables in the following array should be listed 
    // in order of dependence to avoid foreign key constraints
    // when clearing tables.
    private static tablesToClear = [
        TestUtils.tables.sheriff_duty,
        TestUtils.tables.duty,
        TestUtils.tables.duty_recurrence,
        TestUtils.tables.shift,
        TestUtils.tables.assignment,
        TestUtils.tables.courtroom,
        TestUtils.tables.run,
        TestUtils.tables.leave,
        TestUtils.tables.sheriff,
        TestUtils.tables.courthouse,
        TestUtils.tables.region,
    ]

    static async getRecordMetadata(tableName: string, recordId?: string): Promise<DatabaseRecordMetadata> {
        if (!recordId) {
            return {};
        }
        let service: DatabaseService<any> | undefined = undefined;
        switch (tableName) {
            case TestUtils.tables.assignment:
                service = new AssignmentService();
                break;
            case TestUtils.tables.courthouse:
                service = new CourthouseService();
                break;
            case TestUtils.tables.sheriff_duty:
                service = new SheriffDutyService();
                break;
            default:
                throw "Table not supported, add it to the switch case (where this error was thrown)!!";
        }
        if (service) {
            return await service.getMetadataById(recordId);
        }
        return {}
    }

    static DefaultAuthConfig: TokenPayload = {
        userId: 'bnye',
        displayName: 'Nye, Bill',
        guid: 'bnyeguid',
        type: 'testing'
    }

    static getClientWithAuth(authOverrides?: TokenPayload) {
        const authConfig = { ...TestUtils.DefaultAuthConfig, ...authOverrides };
        const { guid, displayName, userId, type } = authConfig;
        const headers = {};
        headers[SITEMINDER_HEADER_USERGUID] = guid;
        headers[SITEMINDER_HEADER_USERDISPLAYNAME] = displayName;
        headers[SITEMINDER_HEADER_USERIDENTIFIER] = userId;
        headers[SITEMINDER_HEADER_USERTYPE] = type;
        return this.getClient(headers);
    }

    static getClient(headers: { [key: string]: string } = {}): ExtendedClient {
        const client = new ExtendedClient('http://localhost:3001/api/v1');

        client.requestInterceptor = (req) => {
            Object.keys(headers).forEach(k => {
                req.set(k, headers[k]);
            });
            return req;
        }
        return client;
    }

    /**
     * Authorizes a client instance and passes it to a callback that can be used
     * for creating / modifying test fixtures necessary for the following tests
     * @static
     * @param {(client:ExtendedClient)=>Promise<void>} setupFunc
     * @memberof TestUtils
     */
    static async setupTestFixtures<T>(setupFunc: (client: ExtendedClient) => Promise<T>) {
        const authedApi = TestUtils.getClientWithAuth();
        if (setupFunc) {
            return await setupFunc(authedApi);
        }
    }

    static async deleteAssignment(assignmentId: string, client?: ClientBase): Promise<void> {
        const dbClient = client ? client : await db.getClient();
        await dbClient.query(`DELETE FROM ${this.tables.assignment} WHERE assignment_id='${assignmentId}'`)
    }

    static async clearTable(client?: ClientBase, ...tables: string[]) {
        const dbClient = client ? client : await db.getClient();
        await Promise.all(tables.map(tn => dbClient.query(`DELETE FROM ${tn};`)));
    }

    static async clearDatabase() {
        await db.transaction(async ({ client }) => {
            await TestUtils.tablesToClear.forEach(async (table) => {
                await TestUtils.clearTable(client, table);
            });
        })
    }

    static async closeDatabase() {
        await closeConnectionPool();
    }

    static randomString(length: number) {
        let str = "";
        for (let i = 0; i < length; ++i) {
            str = `${str}${String.fromCharCode(65 + (Math.random() * 25))}`
        }
        return str;
    }

    static async newTestRegion(): Promise<Region> {
        return await TestUtils.setupTestFixtures(api =>
            api.CreateRegion({
                name: "TEST Region",
                code: TestUtils.randomString(5)
            })
        ) as Region;
    }

    static async newTestCourthouse(regionId: string): Promise<Courthouse> {
        return await TestUtils.setupTestFixtures(api => api.CreateCourthouse({
            regionId,
            name: "TEST COURTHOUSE",
            code: TestUtils.randomString(5)
        })) as Courthouse;
    }

    static async newTestCourtroom(courthouseId: string): Promise<Courtroom> {
        return await TestUtils.setupTestFixtures(api => api.CreateCourtroom({
            name: "TEST COURTROOM",
            courthouseId,
            code: TestUtils.randomString(5)
        })) as Courtroom;
    }

    static async newTestAssignment(courthouseId, assignmentDetails: Partial<Assignment> = {}): Promise<Assignment> {
        let workSectionId = "";
        if (assignmentDetails.jailRoleCode) {
            workSectionId = "JAIL";
        } else if (assignmentDetails.runId) {
            workSectionId = "ESCORTS";
        } else if (assignmentDetails.courtroomId) {
            workSectionId = "COURTS";
        } else if (assignmentDetails.otherAssignCode) {
            workSectionId = "OTHER";
        }
        return await TestUtils.setupTestFixtures(api => api.CreateAssignment({
            ...assignmentDetails,
            workSectionId,
            courthouseId
        })) as Assignment;
    }

    static async newTestSheriff(courthouseId: string, sheriff?: Partial<Sheriff>): Promise<Sheriff> {
        return await TestUtils.setupTestFixtures(api =>
            api.CreateSheriff({
                badgeNo: TestUtils.randomString(5),
                firstName: 'Bill',
                lastName: 'Nye',
                rankCode: 'DEPUTYSHERIFF',
                homeCourthouseId: courthouseId
            })) as Sheriff;
    }

    static async newTestShift(courthouseId: string, shift?: Partial<Shift>): Promise<Shift> {
        return await TestUtils.setupTestFixtures(api => api.CreateShift({
            startDateTime: moment().startOf('day').hours(7).format(),
            endDateTime: moment().startOf('day').hours(8).format(),
            workSectionId: 'COURTS',
            ...shift,
            courthouseId
        })) as Shift;
    }

    static assertDutyRecurrence(actual: DutyRecurrence, expected: DutyRecurrence) {
        expect(actual.id).toBeDefined();
        expect(actual.assignmentId).toBeDefined();
        expect(actual.daysBitmap).toEqual(expected.daysBitmap);
        expect(actual.sheriffsRequired).toEqual(expected.sheriffsRequired);
        expect(actual.startTime).toBeSameTime(expected.startTime);
        expect(actual.endTime).toBeSameTime(expected.endTime);
    }

    static assertImportedDuties(created: Duty[], assignment: Assignment, expectedDate: Moment = moment()) {
        created.forEach(createdDuty => {
            expect(createdDuty.id).toBeDefined();
            const dutyRecurrences = assignment.dutyRecurrences as DutyRecurrence[];
            const dutyRecurrence = dutyRecurrences.find(r => r.id === createdDuty.dutyRecurrenceId) as DutyRecurrence;
            expect(dutyRecurrence).toBeDefined();
            expect(createdDuty.assignmentId).toEqual(assignment.id);
            const sheriffDuties = createdDuty.sheriffDuties as SheriffDuty[];
            expect(Array.isArray(sheriffDuties)).toBeTruthy();
            expect(sheriffDuties.length).toEqual(dutyRecurrence.sheriffsRequired);
            sheriffDuties.forEach(sd => {
                expect(sd.id).toBeDefined();
                expect(sd.dutyId).toEqual(createdDuty.id);
            });

            // Check times of all objects 
            [createdDuty.startDateTime, ...sheriffDuties.map(sd => sd.startDateTime)]
                .forEach(sdt => expect(sdt).toBeSameTime(dutyRecurrence.startTime));

            [createdDuty.endDateTime, ...sheriffDuties.map(sd => sd.endDateTime)]
                .forEach(sdt => expect(sdt).toBeSameTime(dutyRecurrence.endTime));

            if (expectedDate) {
                expect(moment(createdDuty.startDateTime)).toBeSameDate(expectedDate);
                expect(moment(createdDuty.endDateTime)).toBeSameDate(expectedDate);

            }

        })

    }

}

beforeAll(async (done) => {
    await TestUtils.clearDatabase();
    done();
});

afterAll(async (done) => {
    // Don't wait for the database to close, hoping it does
    await TestUtils.closeDatabase();
    done();
});