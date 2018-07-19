import moment from 'moment-timezone';
import { Shift } from '../models/Shift';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { MultipleShiftUpdateRequest } from '../models/MultipleShiftUpdateRequest';
import { ShiftCopyOptions } from '../models/ShiftCopyOptions';
import { setTime } from '../common/TimeUtils';
import { AutoWired, Container } from 'typescript-ioc';
import { ClientBase } from 'pg';

@AutoWired
export class ShiftService extends DatabaseService<Shift> {
    fieldMap = {
        shift_id: 'id',
        work_section_code: 'workSectionId',
        courthouse_id: 'courthouseId',
        sheriff_id: 'sheriffId',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime',
        assignment_id: 'assignmentId'
    };

    constructor() {
        super('shift', 'shift_id');
    }

    getShiftService(client: ClientBase) {
        const service = Container.get(ShiftService) as ShiftService;
        if (client) {
            service.dbClient = client;
        }
        return service;
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

            // Undefined / null means 'varied' (i.e. don't change) so 
            // if we want to clear the workSection we pass in ""
            if (workSectionId) {
                shiftToUpdate.workSectionId = workSectionId;
            } else if (workSectionId === "") {
                shiftToUpdate.workSectionId = null as any;
            }

            // Undefined / null means 'varied' (i.e. don't change) so 
            // if we want to clear the sheriffId we pass in ""
            if (sheriffId) {
                shiftToUpdate.sheriffId = sheriffId;
            } else if (sheriffId === "") {
                shiftToUpdate.sheriffId = null as any;
            }

            let newStartMoment = moment(originalStart);
            if (startTime) {
                newStartMoment = setTime(moment(originalStart), startTime);
            }
            shiftToUpdate.startDateTime = newStartMoment.toISOString();

            let newEndMoment = moment(originalEnd);
            if (endTime) {
                newEndMoment = setTime(moment(originalEnd), endTime);
            }
            shiftToUpdate.endDateTime = newEndMoment.toISOString();

            return shiftToUpdate;
        });


        return await this.db.transaction(async (client) => {
            const service = this.getShiftService(client);
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

        return await this.db.transaction(async client => {
            const shiftService = this.getShiftService(client);
            return await Promise.all(
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
        });
    }
}