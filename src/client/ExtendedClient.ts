import moment from 'moment';
import * as superagent from 'superagent';
import superagentAbsolute from 'superagent-absolute';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift } from './models';


const agent = superagent.agent();

export type DateType = string | moment.Moment | number;

export interface ValidationError {
    response:{
        body:{
            fields: { 
                [key: string]: { 
                    message: string, 
                    value: any 
                } 
            };            
        }
    }
    message:string;
}

export default class ExtendedClient extends Client {
    constructor(baseUrl: string) {
        super(superagentAbsolute(superagent.agent())(baseUrl));
        this.errorProcessor = this.processError;
    }

    static isValidationError(err: any): err is ValidationError {
        return err!.response!.body!.name ==="ValidateError";
    }

    protected processError(err) {
        if (ExtendedClient.isValidationError(err)) {
            let message = ["Validation Error"];
            const fields = err.response!.body!.fields || {};
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
    GetSheriffs(courthouseId: string = ""): Promise<Sheriff[]> {
        return super.GetSheriffs(courthouseId);
    }


    async GetCourtroomById(id: string): Promise<Courtroom> {
        return await this.nullOn404(
            () => super.GetCourtroomById(id)
        );
    }

    GetCourtrooms(courthouseId: string = ""): Promise<Courtroom[]> {
        return super.GetCourtrooms(courthouseId);
    }


    async GetAssignmentById(id: string): Promise<Assignment> {
        return await this.nullOn404(
            () => super.GetAssignmentById(id)
        );
    }

    GetAssignments(courthouseId: string = "", startDate?: DateType, endDate?: DateType): Promise<Assignment[]> {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetAssignments(courthouseId, startMoment.toISOString(), endMoment.toISOString());
    }

    GetRuns(courthouseId: string = ""): Promise<Run[]> {
        return super.GetRuns(courthouseId);
    }

    async GetRunById(id: string): Promise<Run> {
        return await this.nullOn404(
            () => super.GetRunById(id)
        );
    }

    GetShifts(courthouseId: string = ""): Promise<Shift[]> {
        return super.GetShifts(courthouseId);
    }

    async GetShiftById(id: string): Promise<Shift> {
        return await this.nullOn404(
            () => super.GetShiftById(id)
        );
    }

    async GetDutyRecurrenceById(id: string): Promise<DutyRecurrence> {
        return await this.nullOn404(
            () => super.GetDutyRecurrenceById(id)
        );
    }

    GetDutyRecurrences(startDate?: DateType, endDate?: DateType): Promise<DutyRecurrence[]> {
        const startMoment = moment(startDate);
        const endMoment = endDate ? moment(endDate) : moment(startMoment);
        return super.GetDutyRecurrences(startMoment.toISOString(), endMoment.toISOString());
    }

    async GetDutyById(id: string): Promise<Duty> {
        return await this.nullOn404(
            () => super.GetDutyById(id)
        );
    }
}