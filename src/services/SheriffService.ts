
import moment from 'moment';
import { AutoWired, Inject, Container } from 'typescript-ioc';

import { SYSTEM_USER_DISPLAY_NAME} from '../common/authentication';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { UserService } from './UserService';
import { Sheriff } from '../models/Sheriff';
import { User } from '../models/User';

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
        const userService = Container.get(UserService);

        const query = super.getSelectQuery();
        // TODO: What if the location is on the sheriff, and not the user
        if (locationId) {
            query.where(`home_location_id='${locationId}' OR current_location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<Sheriff>(query.toString());

        const results = rows.map(async entity => {
            if (entity.id) {
                const userEntity = await userService.getBySheriffId(entity.id);
                if (userEntity) {
                    entity.user = userEntity as User;
                }
            }
            return entity;
        });

        return Promise.all(results);
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
                    const newUser = {} as User;

                    if (entity && entity.user) {
                        user.sheriffId = sheriff.id,
                        user.displayName = `${sheriff.firstName} ${sheriff.lastName}`
                        user.siteminderId = entity.user.siteminderId;
                        user.userAuthId = entity.user.userAuthId;
                        user.createdBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                        user.createdDtm = (user.createdDtm) ? moment(user.createdDtm).toISOString() : moment(new Date()).toISOString();
                        user.updatedBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                        user.updatedDtm = moment(new Date()).toISOString();
                    }

                    user = userService.create(newUser);
                }
            }
        });

        return { ...rows[0], user };
    }

    /**
     * Override DatabaseService's update method, with one that can update the user and sheriff profile in one call.
     * @param entity
     */
    async update(entity: Partial<Sheriff>): Promise<Sheriff> {
        this.validateSheriff(entity);

        let user;

        await this.db.transaction(async ({ client, getService }) => {
            const userService = getService<UserService>(UserService);
            if (entity && entity.id && entity.user) {
                user = await userService.getBySheriffId(entity.id);
                // Update the user display name
                user.siteminderId = entity.user.siteminderId;
                user.userAuthId = entity.user.userAuthId;
                user.displayName = `${entity.firstName} ${entity.lastName}`;
                user.createdBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                user.createdDtm = (user.createdDtm) ? moment(user.createdDtm).toISOString() : moment(new Date()).toISOString();
                user.updatedBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                user.updatedDtm = moment(new Date()).toISOString();

                user = await userService.update(user);
            }
        });

        const query = this.getUpdateQuery(entity);
        const rows = await this.executeQuery<Sheriff>(query.toString());
        return { ...rows[0], user };
    }

    private validateSheriff(entity: Partial<Sheriff>) {
        return true;
    }
}
