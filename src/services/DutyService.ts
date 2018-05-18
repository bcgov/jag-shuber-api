import { Duty } from '../models/Duty';
import { DatabaseService } from './DatabaseService';
import { AssignmentService } from './AssignmentService';
import { DutyRecurrenceService } from './DutyRecurrenceService';

export class DutyService extends DatabaseService<Duty> {
    fieldMap = {
        duty_id: 'id',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime',
        sheriffs_required: 'sheriffsRequired',
        assignment_id: 'assignmentId',
        duty_recurrence_id: 'dutyRecurrenceId'
    };

    constructor() {
        super('duty', 'duty_id');
    }

    async getAll(courthouseId?: string) {
        const query = super.getSelectQuery();
        if (courthouseId) {
            query.where(`courthouse_id='${courthouseId}'`);
        };
        const rows = await this.executeQuery<Duty>(query.toString());
        return rows;
    }

    async importDefaults(courthouseId:string, date?:string) : Promise<Duty[]>{
        // const assignmentService = new AssignmentService();
        // const dutyReccurenceService = new DutyRecurrenceService();
        
        // this.squel.select

        // Query for selecting duty recurrences that need duties generated
        // select 
        //     dr.duty_recurrence_id, 
        //     dr.start_time, 
        //     dr.end_time, 
        //     dr.sheriffs_required, 
        //     dr.assignment_id, 
        //     dr.days_bitmap,
        //     cast((dr.days_bitmap::bigint) as bit(7)) as days_of_week
        //     from duty_recurrence as dr join assignment as a 
        //     on (dr.assignment_id=a.assignment_id)
        //     where a.courthouse_id='8117ea77-fa37-4442-a865-4e64f70b7cfa'
        //     and (cast(dr.days_bitmap::bigint as bit(7)) & 8::bit(7))=8::bit(7)
        //     and NOT EXISTS (
        //         select duty_id from duty 
        //         where duty.duty_recurrence_id = dr.duty_recurrence_id
        //         AND date_trunc('day',duty.start_dtm)=date_trunc('day',current_timestamp)
        //     )

        throw "Not Implemented";
    }
}