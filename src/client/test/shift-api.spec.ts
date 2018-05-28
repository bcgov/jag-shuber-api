import ApiClient from '../ExtendedClient';
import {
    Courthouse,
    Region,
    Shift,
    MultipleShiftUpdateRequest,
    Sheriff,
    ShiftCopyOptions
} from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

describe('Shift API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Shift Testing Region",
        code: TestUtils.randomString(5)
    }
    let testCourthouse: Courthouse = {
        name: "Shift Testing Courthouse",
        code: TestUtils.randomString(5)
    }

    const entityToCreate: Shift = {
        courthouseId: "To Replace",
        workSectionId: "COURTS",
        startDateTime: moment().toISOString(),
        endDateTime: moment().add(1, 'hour').toISOString()
    };

    let createdEntity: Shift;

    beforeAll(async (done) => {
        api = TestUtils.getClient();
        testRegion = await api.CreateRegion(testRegion);
        testCourthouse = await api.CreateCourthouse({ ...testCourthouse, regionId: testRegion.id });
        done();
    });

    describe('CRUD Operations', () => {
        it('create should return new Shift', async () => {
            createdEntity = await api.CreateShift({
                ...entityToCreate,
                courthouseId: testCourthouse.id
            });
            expect(createdEntity).toBeDefined();
            expect(createdEntity.id).toBeDefined();
            expect(createdEntity.courthouseId).toEqual(testCourthouse.id);
            expect(createdEntity).toEqual({
                ...createdEntity,
                ...entityToCreate,
                courthouseId: testCourthouse.id
            });
        });

        it('get by id should return Shift', async () => {
            const retrieved = await api.GetShiftById(createdEntity.id);
            expect(retrieved).toMatchObject(createdEntity);
        });

        it('get List should return list of Shifts', async () => {
            const list = await api.GetShifts();
            expect(list).toBeDefined();
            expect(Array.isArray(list)).toBeTruthy();
            expect(list.length).toEqual(1);
        });

        it('get list should return only those shifts in courthouse if specified', async () => {
            const secondTestCourthouse = { ...testCourthouse }
            delete secondTestCourthouse['id'];
            secondTestCourthouse.name = "Test Courthouse 2";
            secondTestCourthouse.code = "TCH32";
            const secondCourthouse = await api.CreateCourthouse(secondTestCourthouse);
            const secondEntity = await api.CreateShift({
                ...entityToCreate,
                courthouseId: secondCourthouse.id
            } as Shift);

            let list = await api.GetShifts();
            expect(list.length).toEqual(2);

            list = await api.GetShifts(secondCourthouse.id);
            expect(list.length).toEqual(1);
            expect(list[0]).toEqual(secondEntity);
        });


        it('update shift should return updated Shift', async () => {
            const newEndDateTime = moment().add(4, 'hour').toISOString()
            const updatedEntity = await api.UpdateShift(createdEntity.id, {
                ...createdEntity,
                endDateTime: newEndDateTime
            } as Shift);
            expect(updatedEntity).toMatchObject({
                ...createdEntity,
                endDateTime: newEndDateTime,
            });
        });


        // ####################################################
        // ################  CURRENTLY BROKEN  ################
        // ####################################################
        it.skip('removing a shifts work section via update should return an updated Shift', async () => {
            const newWorkSection = null;
            const updatedEntity = await api.UpdateShift(createdEntity.id, {
                ...createdEntity,
                workSectionCode: newWorkSection
            } as Shift);
            expect(updatedEntity).toMatchObject({
                ...createdEntity,
                workSectionCode: newWorkSection,
            });
        });

        it('delete should delete Shift', async () => {
            await api.DeleteShift(createdEntity.id);
            const retreived = await api.GetShiftById(createdEntity.id);
            expect(retreived).not.toBeDefined();
        });
    });

    describe('Edit Multiple Shifts', () => {
        let testShifts: Shift[] = [];
        let createdSheriff: Sheriff = {};
        beforeAll(async (done) => {
            const sheriffToCreate: Sheriff = {
                firstName: 'Bill',
                lastName: 'Nye',
                badgeNo: '12345678',
                rankCode: "DEPUTYSHERIFF",
                homeCourthouseId: testCourthouse.id
            };

            createdSheriff = await api.CreateSheriff(sheriffToCreate);

            done();
        });

        beforeEach(async (done) => {
            await TestUtils.clearTable(undefined, 'shift');
            const workSectionIds = ['COURTS', 'JAIL', 'ESCORTS', 'OTHER'];
            testShifts = await Promise.all(workSectionIds.map((id, index) =>
                api.CreateShift({
                    courthouseId: testCourthouse.id,
                    startDateTime: moment().add(index, 'day').hours(7).toISOString(),
                    endDateTime: moment().add(index, 'day').hours(8 + 1).toISOString(),
                    workSectionId: id
                })));
            done();
        })

        it('should update the work section id for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                workSectionId: 'COURTS'
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const courthouseShifts = await api.GetShifts(testCourthouse.id);
            const retrieved = courthouseShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            expect(updatedShifts.every(s => s.workSectionId === 'COURTS')).toBeTruthy();

        });

        it('should update the start time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newStartTime = moment().startOf('day').add(8, 'hours').add(15, 'minutes');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                startTime: newStartTime.toISOString()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const courthouseShifts = await api.GetShifts(testCourthouse.id);
            const retrieved = courthouseShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.map(s => moment(s.startDateTime).format('HH:mm')).forEach(startTime => expect(startTime).toEqual(newStartTime.format('HH:mm')));

            // Make sure that days are the expected values
            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                expect(moment(us.startDateTime).format("YYYY-MM-DD")).toEqual(moment(testShift.startDateTime).format("YYYY-MM-DD"));
            });
        });

        it('should update the end time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newEndTime = moment().startOf('day').add(17, 'hours').add(15, 'minutes');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                endTime: newEndTime.toISOString()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const courthouseShifts = await api.GetShifts(testCourthouse.id);
            const retrieved = courthouseShifts.filter(s => testShiftIds.includes(s.id));
            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            // Make sure all of the times are correct
            updatedShifts.map(s => moment(s.endDateTime).format('HH:mm')).forEach(endTime => expect(endTime).toEqual(newEndTime.format('HH:mm')));

            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                expect(moment(us.endDateTime).utc().format("YYYY-MM-DD")).toEqual(moment(testShift.endDateTime).utc().format("YYYY-MM-DD"));
            });

        });

        it('should update the sheriff id for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                sheriffId: createdSheriff.id
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const courthouseShifts = await api.GetShifts(testCourthouse.id);
            const retrieved = courthouseShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            expect(updatedShifts.every(s => s.sheriffId === createdSheriff.id)).toBeTruthy();

        });

        it('should update the start and end time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newStartTime = moment().startOf('day').add(8, 'hours');
            const newEndTime = moment().startOf('day').add(17, 'hours').add(15, 'minutes');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                startTime: newStartTime.toISOString(),
                endTime: newEndTime.toISOString()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const courthouseShifts = await api.GetShifts(testCourthouse.id);
            const retrieved = courthouseShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.map(s => moment(s.endDateTime).format('HH:mm')).forEach(endTime => expect(endTime).toEqual(newEndTime.format('HH:mm')));
            updatedShifts.map(s => moment(s.startDateTime).format('HH:mm')).forEach(startTime => expect(startTime).toEqual(newStartTime.format('HH:mm')));

            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                expect(moment(us.startDateTime).utc().format("YYYY-MM-DD")).toEqual(moment(testShift.startDateTime).utc().format("YYYY-MM-DD"));
                expect(moment(us.endDateTime).utc().format("YYYY-MM-DD")).toEqual(moment(testShift.endDateTime).utc().format("YYYY-MM-DD"));
            });
        });
    })

    describe('Copy Shifts', () => {
        let testShifts: Shift[] = [];
        let createdSheriff: Sheriff = {};
        const startOfWeekSourceMoment = moment().startOf('week').add(1, 'week'); //May 27
        beforeAll(async (done) => {
            createdSheriff = await TestUtils.newTestSheriff(testCourthouse.id);
            done();
        });

        beforeEach(async (done) => {
            await TestUtils.clearTable(undefined, 'shift');
            const workSectionIds = ['COURTS', 'JAIL', 'ESCORTS', 'OTHER'];
            testShifts = await Promise.all(workSectionIds.map((id, index) =>
                api.CreateShift({
                    courthouseId: testCourthouse.id,
                    startDateTime: moment(startOfWeekSourceMoment).add(index + 1, 'day').add(8, 'hour').toISOString(),
                    endDateTime: moment(startOfWeekSourceMoment).add(index + 1, 'day').add(16, 'hour').toISOString(),
                    workSectionId: id,
                    sheriffId: createdSheriff.id
                })));
            done();
        });

        function assertCopiedShifts(copiedShifts: Shift[], copyOptions: ShiftCopyOptions) {
            const { startOfWeekDestination, startOfWeekSource, shouldIncludeSheriffs } = copyOptions

            expect(copiedShifts).toHaveLength(testShifts.length);

            expect(copiedShifts.every(s => shouldIncludeSheriffs ? s.sheriffId != undefined : s.sheriffId == undefined)).toBeTruthy();

            copiedShifts.forEach(copiedShift => {
                expect(copiedShift.workSectionId).toBeDefined();
                const sourceShift = testShifts.find(ts => ts.workSectionId === copiedShift.workSectionId);
                expect(moment(copiedShift.startDateTime).isSame(moment(startOfWeekDestination), 'week')).toBeTruthy();
                expect(moment(copiedShift.endDateTime).isSame(moment(startOfWeekDestination), 'week')).toBeTruthy();
                expect(moment(copiedShift.startDateTime).format('d HH:mm')).toEqual((moment(sourceShift.startDateTime).format('d HH:mm')));
                expect(moment(copiedShift.endDateTime).format('d HH:mm')).toEqual((moment(sourceShift.endDateTime).format('d HH:mm')));
            })
        }

        it('should create a new shift in the destination week for each shift in the source week without sheriffs', async () => {
            const testShiftIds = testShifts.map(s => s.id);

            const copyOptions: ShiftCopyOptions = {
                shouldIncludeSheriffs: false,
                startOfWeekSource: startOfWeekSourceMoment.toISOString(),
                startOfWeekDestination: moment(startOfWeekSourceMoment).add(1, 'week').toISOString(),
                courthouseId: testCourthouse.id
            }
            const initialCourthouseShifts = await api.GetShifts(testCourthouse.id);
            const initialRetreivedCourthouseShifts = initialCourthouseShifts.filter(s => testShiftIds.includes(s.id));

            const copiedShifts = await api.CopyShifts(copyOptions);

            assertCopiedShifts(copiedShifts, copyOptions);
        });

        it('should create a new shift in the destination week for each shift in the source week with sheriffs', async () => {
            const testShiftIds = testShifts.map(s => s.id);

            const copyOptions: ShiftCopyOptions = {
                shouldIncludeSheriffs: true,
                startOfWeekSource: startOfWeekSourceMoment.toISOString(),
                startOfWeekDestination: moment(startOfWeekSourceMoment).add(1, 'week').toISOString(),
                courthouseId: testCourthouse.id
            }
            const initialCourthouseShifts = await api.GetShifts(testCourthouse.id);
            const initialRetreivedCourthouseShifts = initialCourthouseShifts.filter(s => testShiftIds.includes(s.id));

            const copiedShifts = await api.CopyShifts(copyOptions);

            assertCopiedShifts(copiedShifts, copyOptions);
        });
    });
});
