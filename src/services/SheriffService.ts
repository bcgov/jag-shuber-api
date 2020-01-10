import moment from 'moment';
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

    /**
     * Override DatabaseService's create method, with one that creates and links a sheriff profile to the user too.
     * @param entity
     */
    async create(entity: Partial<Sheriff>): Promise<Sheriff> {
        this.validateSheriff(entity);

        const query = this.getInsertQuery(entity);
        const rows = await this.executeQuery<Sheriff>(query.toString());
        const sheriff = rows[0];

        let user;

        await this.db.transaction(async ({ client, getService }) => {
            const userService = getService<UserService>(UserService);
            if (sheriff && sheriff.id) {
                user = userService.getBySheriffId(sheriff.id);
                if (!user) {
                    user = await userService.create({
                        sheriffId: sheriff.id,
                        displayName: `${sheriff.firstName} ${sheriff.lastName}`
                    });
                }
            }
        });

        return rows[0];
    }

    /**
     * Override DatabaseService's update method, with one that can update the user and sheriff profile in one call.
     * @param entity
     */
    async update(entity: Partial<Sheriff>): Promise<Sheriff> {
        this.validateSheriff(entity);

        await this.db.transaction(async ({ client, getService }) => {
            const userService = getService<UserService>(UserService);
            if (entity && entity.id) {
                let user = await userService.getBySheriffId(entity.id);
                // Update the user display name
                user.displayName = `${entity.firstName} ${entity.lastName}`;
                user.createdDtm = (user.createdDtm) ? moment(user.createdDtm).toISOString() : moment(new Date()).toISOString();
                user.updatedBy = 'DEV - Backend';
                user.updatedDtm = moment(new Date()).toISOString();

                await userService.update(user);
            }
        });

        const query = this.getUpdateQuery(entity);
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return rows[0];
    }

    private validateSheriff(entity: Partial<Sheriff>) {
        return true;
    }
}
