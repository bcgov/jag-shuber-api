/// <reference types="moment" />
import moment from 'moment';
import Client from './Client';
import { Assignment, Courthouse, Courtroom, Duty, DutyRecurrence, Region, Run, Sheriff, Shift } from './models';
export declare type DateType = string | moment.Moment | number;
export default class ExtendedClient extends Client {
    constructor(baseUrl: string);
    private errorHandler(err);
    private nullOn404<T>(method);
    GetRegionById(id: string): Promise<Region>;
    GetCourthouseById(id: string): Promise<Courthouse>;
    GetSheriffById(id: string): Promise<Sheriff>;
    GetSheriffs(courthouseId?: string): Promise<Sheriff[]>;
    GetCourtroomById(id: string): Promise<Courtroom>;
    GetCourtrooms(courthouseId?: string): Promise<Courtroom[]>;
    GetAssignmentById(id: string): Promise<Assignment>;
    GetAssignments(courthouseId?: string, startDate?: DateType, endDate?: DateType): Promise<Assignment[]>;
    GetRuns(courthouseId?: string): Promise<Run[]>;
    GetRunById(id: string): Promise<Run>;
    GetShifts(courthouseId?: string): Promise<Shift[]>;
    GetShiftById(id: string): Promise<Shift>;
    GetDutyRecurrenceById(id: string): Promise<DutyRecurrence>;
    GetDutyRecurrences(startDate?: DateType, endDate?: DateType): Promise<DutyRecurrence[]>;
    GetDutyById(id: string): Promise<Duty>;
}
