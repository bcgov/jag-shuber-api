import { DatabaseService } from '../infrastructure/DatabaseService';
import { UserService } from './UserService';
import { Sheriff } from '../models/Sheriff';
import { User } from '../models/User';
import { AutoWired, Inject, Container } from 'typescript-ioc';

@AutoWired
export class SheriffService extends DatabaseService<Sheriff> {
    fieldMap = {
        sheriff_id: 'id',
        badge_no: 'badgeNo',
        first_name: 'firstName',
        last_name: 'lastName',
        image_url: 'imageUrl',
        home_location_id: 'homeLocationId',
        current_location_id:'currentLocationId',
        sheriff_rank_code: 'rankCode',
        alias:'alias',
        gender_code: 'genderCode'
    };

    // @Inject
    // private userService!: UserService;

    constructor() {
        super('sheriff', 'sheriff_id');
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        if (locationId) {
            query.where(`home_location_id='${locationId}' OR current_location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return rows;
    }
}
