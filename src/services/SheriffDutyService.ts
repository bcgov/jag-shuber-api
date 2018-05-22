import { Duty } from '../models/Duty';
import { DatabaseService } from './DatabaseService';
import { SheriffDuty } from '../models/SheriffDuty';

export class SheriffDutyService extends DatabaseService<SheriffDuty> {

    fieldMap = {
        sheriff_duty_id: 'id',
        duty_id:'dutyId',
        sheriff_id:'sheriffId',
        start_dtm: 'startDateTime',
        end_dtm: 'endDateTime'        
    };

    async getAllForDuties(dutyIds: string[]): Promise<SheriffDuty[]> {
        const query = this.getSelectQuery();
        query.where('duty_id IN ?',dutyIds);
        query.order('duty_id');
        return await this.executeQuery<SheriffDuty>(query.toString());
    }
    async getAllForDuty(dutyId: string): Promise<SheriffDuty[]> {
        return this.getAllForDuties([dutyId]);
    }

    constructor() {
        super('sheriff_duty', 'sheriff_duty_id');
    }
}