import moment from 'moment';
import squel from 'squel';

import { AutoWired, Inject, Container } from 'typescript-ioc';

import { SYSTEM_USER_DISPLAY_NAME} from '../common/authentication';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { UserService } from './UserService';
import { SheriffLocationService } from './SheriffLocationService';

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
        sheriff_rank_code: 'rankCode',
        alias: 'alias',
        gender_code: 'genderCode'
    };

    // @Inject
    // private userService!: UserService;

    constructor() {
        super('sheriff', 'sheriff_id');
    }

    public joinOnSheriffs(
        query: squel.PostgresSelect,
        dbTableName: string,
        dbTableJoinCol: string = 'sheriff_id',
        homeLocSheriffsAlias: string = 'home_loc_sheriffs',
        currLocSheriffsAlias: string = 'curr_loc_sheriffs',
        currLocSheriffLocationsAlias: string = 'curr_loc_sheriff_locations'

    ) {
        const sheriffLocationService = Container.get(SheriffLocationService);

        query
            // Left join on matching sheriffs, we can use these matches to filter matches by home location
            .left_join(
                this.dbTableName,
                homeLocSheriffsAlias,
                `${homeLocSheriffsAlias}.sheriff_id=${dbTableName}.${dbTableJoinCol}`
            )
            // Join on matching sheriffs, we will filter these matches by current location
            .left_join(
                this.dbTableName,
                currLocSheriffsAlias,
                `${currLocSheriffsAlias}.sheriff_id=${dbTableName}.${dbTableJoinCol}`
            )
            .left_join(
                sheriffLocationService.dbTableName,
                currLocSheriffLocationsAlias,
                `${currLocSheriffLocationsAlias}.sheriff_id=${currLocSheriffsAlias}.sheriff_id`
            );

        return query;
    }

    async getAll(locationId?: string) {
        const homeLocSheriffsAlias: string = 'home_loc_sheriffs';
        // const currLocSheriffsAlias: string = 'curr_loc_sheriffs';
        const currLocSheriffLocationsAlias: string = 'curr_loc_sheriff_locations';

        const userService = Container.get(UserService);

        const query = super.getSelectQuery();

        if (locationId) {
            query.field(`${currLocSheriffLocationsAlias}.location_id`, 'currentLocationId');

            this.joinOnSheriffs(query, this.dbTableName, this.primaryKey);
            // Only include results that match the given location
            query.where(`${homeLocSheriffsAlias}.home_location_id='${locationId}' OR ${currLocSheriffLocationsAlias}.location_id='${locationId}'`);
            // Results are returned for all user locations that aren't expired
            // We could have used a subquery to determine the currentLocationId,
            // but joining is faster, so we have to make sure that we only return
            // the record that corresponds to the user's current location
            const currentDate = moment().toISOString();
            query.where(
                squel.expr()
                    .and(`${this.dbTableName}.home_location_id='${locationId}'`)
                    .or(`${currLocSheriffLocationsAlias}.start_date <= Date('${currentDate}')`)
                    .and(`${currLocSheriffLocationsAlias}.end_date >= Date('${currentDate}')`)

            );
        }
        
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
                user = await userService.getBySheriffId(sheriff.id);
                if (!user) {
                    const newUser = {} as User;

                    if (entity && entity.user) {
                        newUser.sheriffId = sheriff.id;
                        newUser.displayName = `${sheriff.firstName} ${sheriff.lastName}`;
                        newUser.siteminderId = entity.user.siteminderId || null;
                        newUser.userAuthId = entity.user.userAuthId || null;
                        newUser.systemAccountInd = entity.user.systemAccountInd || 0;
                        newUser.effectiveDate = entity.user.effectiveDate || null;
                        newUser.expiryDate = entity.user.expiryDate || null;
                        newUser.createdBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                        // The DB trigger should handle this
                        newUser.createdDtm = (entity.user.createdDtm) ? moment(entity.user.createdDtm).toISOString() : moment(new Date()).toISOString();
                        newUser.updatedBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                        // newUser.updatedDtm = moment(new Date()).toISOString();
                    }

                    user = await userService.create(newUser);
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
                user.displayName = `${entity.firstName} ${entity.lastName}`;
                user.siteminderId = entity.user.siteminderId || null;
                user.userAuthId = entity.user.userAuthId || null;
                user.systemAccountInd = entity.user.systemAccountInd || 0;
                user.effectiveDate = entity.user.effectiveDate || null;
                user.expiryDate = entity.user.expiryDate || null;
                user.createdBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                // The DB trigger should handle this
                user.createdDtm = (entity.user.createdDtm) ? moment(entity.user.createdDtm).toISOString() : moment(new Date()).toISOString();
                user.updatedBy = SYSTEM_USER_DISPLAY_NAME; // TODO: Replace with currentUser
                // The DB trigger should handle this
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
