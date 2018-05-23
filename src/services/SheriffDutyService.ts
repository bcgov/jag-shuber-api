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

    constructor() {
        super('sheriff_duty', 'sheriff_duty_id');
    }

    async getAllForDuties(dutyIds: string[]=[]): Promise<SheriffDuty[]> {
        if(dutyIds.length==0){
            return [];
        }

        const query = this.getSelectQuery();
        query.where('duty_id IN ?',dutyIds);
        query.order('duty_id');
        return await this.executeQuery<SheriffDuty>(query.toString());
    }
    async getAllForDuty(dutyId: string): Promise<SheriffDuty[]> {
        if(!dutyId){
            return []
        }
        return this.getAllForDuties([dutyId]);
    }
}