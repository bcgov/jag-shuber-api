import moment from 'moment';
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
        const query = this.squel.update({ autoQuoteAliasNames: true })
            .table(this.dbTableName)
            .where('shift_id IN ?', shiftIds)
            .returning(this.getReturningFields());

        if (workSectionId) {
            query.set('work_section_code', workSectionId);
        }
        if (sheriffId) {
            query.set('sheriff_id', sheriffId);
        }
        if (startTime) {
            const startTimeMoment = moment(startTime).utc();
            query.set('start_dtm',
                this.squel.str(`DATE(start_dtm)+interval '${startTimeMoment.hours()} hours ${startTimeMoment.minutes()} minutes'`));
        }
        if (endTime) {
            const endTimeMoment = moment(endTime).utc();
            query.set('end_dtm',
                this.squel.str(`DATE(start_dtm)+interval '${endTimeMoment.hours()} hours ${endTimeMoment.minutes()} minutes'`));
        }
        return await this.executeQuery<Shift>(query.toString());
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