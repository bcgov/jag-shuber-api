import moment from 'moment-timezone';
import { Shift } from '../models/Shift';
import { DatabaseService } from './DatabaseService';
import { MultipleShiftUpdateRequest } from '../models/MultipleShiftUpdateRequest';
import { ShiftCopyOptions } from '../models/ShiftCopyOptions';

export class ShiftService extends DatabaseService<Shift> {
    fieldMap = {
        shift_id: 'id',
        work_section_code: 'workSectionId',
        courthouse_id: 'courthouseId',
        sheriff_id: 'sheriffId',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime'
    };

    constructor() {
        super('shift', 'shift_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Shift>(query.toString());
        return rows;
    }

    async updateMultipleShifts(multipleShiftsUpdateRequest: MultipleShiftUpdateRequest): Promise<Shift[]> {
        const { shiftIds = [], workSectionId, endTime, startTime, sheriffId } = multipleShiftsUpdateRequest;

        const currentShiftQuery = this.getSelectQuery()
            .where('shift_id IN ?', shiftIds);
        const currentShifts = await this.executeQuery<Shift>(currentShiftQuery.toString());

        const shiftUpdates = currentShifts.map(shift => {
            const shiftToUpdate = { ...shift };
            const { startDateTime: originalStart, endDateTime: originalEnd } = shift;

            if (workSectionId) {
                shiftToUpdate.workSectionId = workSectionId;
            } else if (workSectionId === "") {
                shiftToUpdate.workSectionId = null as any;
            }

            if (sheriffId) {
                shiftToUpdate.sheriffId = sheriffId;
            }

            let newStartMoment = moment(originalStart);
            if (startTime) {
                // Start time will include the offset (i.e. +7:00), so we use timezone to convert it into UTC
                const newStartTimeMoment = moment.tz(startTime, 'UTC');
                newStartMoment.hours(newStartTimeMoment.hours()).minutes(newStartTimeMoment.minutes());
            }
            shiftToUpdate.startDateTime = newStartMoment.toISOString();

            let newEndMoment = moment(originalEnd);
            if (endTime) {
                // End time will include the offset (i.e. +7:00), so we use timezone to convert it into UTC
                const newEndTimeMoment = moment.tz(endTime, 'UTC');
                newEndMoment.hours(newEndTimeMoment.hours()).minutes(newEndTimeMoment.minutes());
            }

            shiftToUpdate.endDateTime = newEndMoment.toISOString();
            return shiftToUpdate;
        });


        return await this.db.transaction(async (client) => {
            const service = new ShiftService();
            service.dbClient = client;
            return Promise.all(shiftUpdates.map(s => service.update(s)));
        });
    }

    async copyShifts(shiftCopyOptions: ShiftCopyOptions): Promise<Shift[]> {
        const { shouldIncludeSheriffs, startOfWeekDestination, startOfWeekSource, courthouseId } = shiftCopyOptions;
        const startOfWeekSourceUTC = moment(startOfWeekSource).utc().toISOString();
        const endOfWeekSourceUTC = moment(startOfWeekSource).endOf('week').utc().toISOString();

        const selectQuery = super.getSelectQuery();
        selectQuery
            .where(`DATE(start_dtm) BETWEEN '${startOfWeekSourceUTC}' AND '${endOfWeekSourceUTC}'`)
            .where('courthouse_id = ?', courthouseId);
        const sourceShifts = await this.executeQuery<Shift>(selectQuery.toString());

        const copiedShifts = await this.db.transaction(async client => {
            const shiftService = new ShiftService();
            shiftService.dbClient = client;
            const newShifts = await Promise.all(
                sourceShifts.map<Shift>(s => {
                    const { id, startDateTime, endDateTime, sheriffId, ...rest } = s;
                    return {
                        startDateTime: moment(startDateTime).week(moment(startOfWeekDestination).week()).toISOString(),
                        endDateTime: moment(endDateTime).week(moment(startOfWeekDestination).week()).toISOString(),
                        sheriffId: shouldIncludeSheriffs ? sheriffId : undefined,
                        ...rest
                    }
                }).map(newShift => shiftService.create(newShift))
            );
            return newShifts;
        })
        return copiedShifts;
    }
}