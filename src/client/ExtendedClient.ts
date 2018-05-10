import moment from 'moment';
import * as superagent from 'superagent';
import superagentAbsolute from 'superagent-absolute';
import Client from './Client';
import { Courthouse, Region, Sheriff } from './models';

const agent = superagent.agent();

type DateType = string | moment.Moment | number;

export default class ExtendedClient extends Client {
    constructor(baseUrl: string) {
        super(superagentAbsolute(superagent.agent())(baseUrl));
        this.handleError = this.errorHandler;
    }

    private errorHandler(err) {
        if (err!.response!.body!.name === "ValidateError") {
            let message = ["Validation Error"];
            const fields: { [key: string]: { message: string, value: any } } = err.response!.body!.fields || {};
            message.push(...Object.keys(fields).map(k => fields[k].message));
            const newMessage = message.join(' :: ');
            err.message = newMessage;
        } else if (err!.response!.body!.message) {
            err.message = err!.response!.body!.message;
        }
        return err;
    }

    private async nullOn404<T>(method: () => Promise<T>): Promise<T> {
        try {
            return await method();
        } catch (err) {
            if (err.status === 404) {
                return undefined as any;
            } else {
                throw err;
            }
        }
    }

    async GetRegionById(id: string): Promise<Region> {
        return await this.nullOn404(() => super.GetRegionById(id));
    }

    async GetCourthouseById(id: string): Promise<Courthouse> {
        return await this.nullOn404(
            () => super.GetCourthouseById(id)
        );
    }

    async GetSheriffById(id: string): Promise<Sheriff> {
        return await this.nullOn404(
            () => super.GetSheriffById(id)
        );
    }
    GetSheriffs(courthouseId: string = "") {
        return super.GetSheriffs(courthouseId);
    }


    async GetCourtroomById(id: string) {
        return await this.nullOn404(
            () => super.GetCourtroomById(id)
        );
    }

    GetCourtrooms(courthouseId: string = "") {
        return super.GetCourtrooms(courthouseId);
    }


    async GetAssignmentById(id: string) {
        return await this.nullOn404(
            () => super.GetAssignmentById(id)
        );
    }

    GetAssignments(courthouseId: string = "", startDate?: DateType, endDate?: DateType) {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetAssignments(courthouseId, startMoment.toISOString(), endMoment.toISOString());
    }

    GetRuns(courthouseId: string = "") {
        return super.GetRuns(courthouseId);
    }

    async GetRunById(id: string) {
        return await this.nullOn404(
            () => super.GetRunById(id)
        );
    }

    GetShifts(courthouseId: string = "") {
        return super.GetShifts(courthouseId);
    }

    async GetShiftById(id: string) {
        return await this.nullOn404(
            () => super.GetShiftById(id)
        );
    }

    async GetDutyRecurrenceById(id: string) {
        return await this.nullOn404(
            () => super.GetDutyRecurrenceById(id)
        );
    }

    GetDutyRecurrences(startDate?: DateType, endDate?: DateType) {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetDutyRecurrences(startMoment.toISOString(), endMoment.toISOString());
    }

    async GetDutyById(id: string) {
        return await this.nullOn404(
            () => super.GetDutyById(id)
        );
    }
}