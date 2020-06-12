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
        sheriffsAlias: string = 's',
        sheriffLocationsAlias: string = 'sl'

    ) {
        const sheriffLocationService = Container.get(SheriffLocationService);

        query
            .left_join(
                sheriffLocationService.dbTableName,
                sheriffLocationsAlias,
                `${sheriffLocationsAlias}.sheriff_id=${sheriffsAlias}.sheriff_id`
            );

        return query;
    }

    async getAll(locationId?: string) {
        const sheriffsAlias: string = 's';
        const sheriffLocationsAlias: string = 'sl';

        const userService = Container.get(UserService);

        const query = squel.select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" });
        query.fields(this.getAliasedFieldMap('all_sheriffs'));
        query.field(`all_sheriffs.location_id`, 'currentLocationId');

        const currentMoment = moment();

        const homeSheriffsQuery = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, 's')
                .field(`s.sheriff_id`)
                .field(`s.badge_no`)
                .field(`s.first_name`)
                .field(`s.last_name`)
                .field(`s.image_url`)
                .field(`s.home_location_id`)
                .field(`NULL AS location_id`)
                .field(`s.sheriff_rank_code`)
                .field(`s.alias`)
                .field(`s.gender_code`);

        if (locationId) {
            homeSheriffsQuery.where(`s.home_location_id='${locationId}'`);
        }

        const loanedSheriffsQuery = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, 's')
                .field(`s.sheriff_id`)
                .field(`s.badge_no`)
                .field(`s.first_name`)
                .field(`s.last_name`)
                .field(`s.image_url`)
                .field(`s.home_location_id`)
                .field(`sl.location_id`)
                .field(`s.sheriff_rank_code`)
                .field(`s.alias`)
                .field(`s.gender_code`);

        this.joinOnSheriffs(loanedSheriffsQuery, this.dbTableName, this.primaryKey);
        loanedSheriffsQuery.where(`Date('${currentMoment.toISOString()}') BETWEEN ${sheriffLocationsAlias}.start_date AND ${sheriffLocationsAlias}.end_date`);
        loanedSheriffsQuery.order(`${sheriffLocationsAlias}.start_date`);
        loanedSheriffsQuery.order(`${sheriffLocationsAlias}.start_time`);

        query.from(homeSheriffsQuery.union(loanedSheriffsQuery), 'all_sheriffs');

        query
            .group(`all_sheriffs.sheriff_id`)
            .group(`all_sheriffs.badge_no`)
            .group(`all_sheriffs.first_name`)
            .group(`all_sheriffs.last_name`)
            .group(`all_sheriffs.image_url`)
            .group(`all_sheriffs.home_location_id`)
            .group(`all_sheriffs.location_id`)
            .group(`all_sheriffs.sheriff_rank_code`)
            .group(`all_sheriffs.alias`)
            .group(`all_sheriffs.gender_code`)
            .order(`all_sheriffs.last_name`, true)
            .order(`all_sheriffs.first_name`, true)
            .order(`all_sheriffs.location_id`, false);

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
