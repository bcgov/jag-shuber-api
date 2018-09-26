import ApiClient from '../ExtendedClient';
import {
    Location,
    Region,
    Shift,
    MultipleShiftUpdateRequest,
    Sheriff,
    ShiftCopyOptions,
    Assignment,
    CourtRoleCode
} from '../models';
import TestUtils from './TestUtils';
import moment from 'moment';

describe('Shift API', () => {
    let api: ApiClient;

    let testRegion: Region = {
        name: "Shift Testing Region",
        code: TestUtils.randomString(5)
    }
    let testLocation: Location = {
        name: "Shift Testing Location",
        code: TestUtils.randomString(5)
    }

    

    const entityToCreate: Shift = {
        locationId: "To Replace",
        workSectionId: "COURTS",
        startDateTime: moment().toISOString(),
        endDateTime: moment().add(1, 'hour').toISOString()
    };

    let createdEntity: Shift;

    beforeAll(async (done) => {
        await TestUtils.setupTestFixtures(async client=>{
            testRegion = await client.CreateRegion(testRegion);
            testLocation = await client.CreateLocation({ ...testLocation, regionId: testRegion.id });
        });
        api = TestUtils.getClientWithAuth();
        done();
    });

    describe('CRUD Operations', () => {
        it('create should return new Shift', async () => {
            createdEntity = await api.CreateShift({
                ...entityToCreate,
                locationId: testLocation.id,
                
            });
            expect(createdEntity).toBeDefined();
            expect(createdEntity.id).toBeDefined();
            expect(createdEntity.locationId).toEqual(testLocation.id);
            expect(createdEntity).toEqual({
                ...createdEntity,
                ...entityToCreate,
                locationId: testLocation.id
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

        it('get list should return only those shifts in location if specified', async () => {
            const secondTestLocation = { ...testLocation }
            delete secondTestLocation['id'];
            secondTestLocation.name = "Test Location 2";
            secondTestLocation.code = "TCH32";
            const secondLocation = await api.CreateLocation(secondTestLocation);
            const secondEntity = await api.CreateShift({
                ...entityToCreate,
                locationId: secondLocation.id
            } as Shift);

            let list = await api.GetShifts();
            expect(list.length).toEqual(2);

            list = await api.GetShifts(secondLocation.id);
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

        it('removing a shifts work section via update should return an updated Shift', async () => {
            const updatedEntity = await api.UpdateShift(createdEntity.id, {
                ...createdEntity
            } as Shift);
            const expectedEntity = { ...createdEntity };
            delete expectedEntity.workSectionId;
            expect(updatedEntity).toMatchObject({
                ...expectedEntity,
            });
        });it('linking a shift to an assignment should return the updated shift', async () => {
            let testCourtRoleCode: CourtRoleCode;
            testCourtRoleCode = (await api.GetCourtRoleCodes())[0];

            const testAssignment = await api.CreateAssignment({
                title: "Test Assignment",
                workSectionId: "COURTS",
                locationId: testLocation.id,
                dutyRecurrences: [],
                courtRoleId: testCourtRoleCode.code
            });
            
            const updatedEntity = await api.UpdateShift( createdEntity.id, {
                ...createdEntity,
                assignmentId: testAssignment.id
            } as Shift);
            
            expect(updatedEntity).toMatchObject({
                ...createdEntity,
                assignmentId: testAssignment.id
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
                homeLocationId: testLocation.id
            };

            createdSheriff = await api.CreateSheriff(sheriffToCreate);

            done();
        });

        beforeEach(async (done) => {
            await TestUtils.clearTable(undefined, 'shift');
            const workSectionIds = ['COURTS', 'JAIL', 'ESCORTS', 'OTHER'];
            testShifts = await Promise.all(workSectionIds.map((id, index) =>
                api.CreateShift({
                    locationId: testLocation.id,
                    startDateTime: moment().startOf('day').add(index, 'day').hours(7).toISOString(),
                    endDateTime: moment().startOf('day').add(index, 'day').hours(8 + 1).toISOString(),
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
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            expect(updatedShifts.every(s => s.workSectionId === 'COURTS')).toBeTruthy();
        });

        it('should clear the work section id for each shift if ""', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                workSectionId: ''
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.forEach(s => {
                expect(s.workSectionId == undefined).toBeTruthy();
            });
        });

        it('should update the start time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newStartTime = moment().startOf('day').add(8, 'hours').add(15, 'minutes');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                startTime: newStartTime.format()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.map(s => moment(s.startDateTime)).forEach(startTime => expect(startTime).toBeSameTime(newStartTime));

            // Make sure that days are the expected values
            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                expect(moment(us.startDateTime)).toBeSameDate(moment(testShift.startDateTime));                
            });
        });

        it('should update the end time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newHour = 17;
            const newMinute = 15;
            const newEndTime = moment().startOf('day').add(newHour, 'hours').add(newMinute, 'minutes');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                endTime: newEndTime.format()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));
            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));

            // Make sure all of the times are correct
            updatedShifts.map(s => moment(s.endDateTime)).forEach(endTime => expect(endTime).toBeSameTime(newEndTime));

            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                const testShiftMoment = moment(testShift.endDateTime).hours(newHour).minute(newMinute)
                expect(moment(us.endDateTime)).toBeSameDate(testShiftMoment);                
            });

        });

        it('should update the start and end time for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const newStartHour = 8;
            const newEndHour = 17;
            const newStartTime = moment().startOf('day').add(newStartHour, 'hours');
            const newEndTime = moment().startOf('day').add(newEndHour, 'hours');
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                startTime: newStartTime.format(),
                endTime: newEndTime.format()
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.map(s => moment(s.endDateTime)).forEach(endTime => expect(endTime).toBeSameTime(newEndTime));
            updatedShifts.map(s => moment(s.startDateTime)).forEach(startTime => expect(startTime).toBeSameTime(newStartTime));

            updatedShifts.forEach(us => {
                const testShift = testShifts.find(ts => ts.workSectionId === us.workSectionId);
                const testShiftStart = moment(testShift.startDateTime).hours(newStartHour);
                const testShiftEnd = moment(testShift.endDateTime).hours(newEndHour);
                expect(moment(us.startDateTime)).toBeSameDate(testShiftStart);
                expect(moment(us.endDateTime)).toBeSameDate(testShiftEnd);
            });
        });



        it('should update the sheriff id for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                sheriffId: createdSheriff.id
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            expect(updatedShifts.every(s => s.sheriffId === createdSheriff.id)).toBeTruthy();

        });

        it('should clear the sheriff id for each shift', async () => {
            const testShiftIds = testShifts.map(s => s.id);
            const updates: MultipleShiftUpdateRequest = {
                shiftIds: testShiftIds,
                sheriffId: ""
            }
            const updatedShifts = await api.UpdateMultipleShifts(updates);
            const locationShifts = await api.GetShifts(testLocation.id);
            const retrieved = locationShifts.filter(s => testShiftIds.includes(s.id));

            expect(updatedShifts).toEqual(expect.arrayContaining(retrieved));
            updatedShifts.forEach(s => expect(s.sheriffId).toBeNull());

        });
    })

    describe('Copy Shifts', () => {
        let testShifts: Shift[] = [];
        let createdSheriff: Sheriff = {};
        const startOfWeekSourceMoment = moment().startOf('week').add(1, 'week'); //May 27
        beforeAll(async (done) => {
            createdSheriff = await TestUtils.newTestSheriff(testLocation.id);
            done();
        });

        beforeEach(async (done) => {
            await TestUtils.clearTable(undefined, 'shift');
            const workSectionIds = ['COURTS', 'JAIL', 'ESCORTS', 'OTHER'];
            testShifts = await Promise.all(workSectionIds.map((id, index) =>
                api.CreateShift({
                    locationId: testLocation.id,
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
                locationId: testLocation.id
            }
            const initialLocationShifts = await api.GetShifts(testLocation.id);
            const initialRetreivedLocationShifts = initialLocationShifts.filter(s => testShiftIds.includes(s.id));

            const copiedShifts = await api.CopyShifts(copyOptions);

            assertCopiedShifts(copiedShifts, copyOptions);
        });

        it('should create a new shift in the destination week for each shift in the source week with sheriffs', async () => {
            const testShiftIds = testShifts.map(s => s.id);

            const copyOptions: ShiftCopyOptions = {
                shouldIncludeSheriffs: true,
                startOfWeekSource: startOfWeekSourceMoment.toISOString(),
                startOfWeekDestination: moment(startOfWeekSourceMoment).add(1, 'week').toISOString(),
                locationId: testLocation.id
            }
            const initialLocationShifts = await api.GetShifts(testLocation.id);
            const initialRetreivedLocationShifts = initialLocationShifts.filter(s => testShiftIds.includes(s.id));

            const copiedShifts = await api.CopyShifts(copyOptions);

            assertCopiedShifts(copiedShifts, copyOptions);
        });
    });
});
