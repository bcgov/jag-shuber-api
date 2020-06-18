import moment from 'moment';
import { PostgresSelect, select } from 'squel';

import { AutoWired, Inject, Container } from 'typescript-ioc';

import { SYSTEM_USER_DISPLAY_NAME} from '../common/authentication';

import { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';

import { UserService } from './UserService';
import { EffectiveSheriffLocationService } from './EffectiveSheriffLocationService';
import { SheriffLocationService } from './SheriffLocationService';
import { LocationService } from './LocationService';

import { Sheriff } from '../models/Sheriff';
import { SheriffLocation } from '../models/SheriffLocation';
import { Location } from '../models/Location';
import { User } from '../models/User';
import { start } from 'repl';

@AutoWired
export class SheriffService extends EffectiveSheriffLocationService<Sheriff> {
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

    protected effectiveField = 'start_date';
    protected expiryField = 'end_date';
    protected effectiveTimeField = 'start_time';
    protected expiryTimeField = 'end_time';

    pickCurrentLocation(sheriffLocations: SheriffLocation[]) {
        const sheriffLocation: SheriffLocation | undefined = (sheriffLocations && sheriffLocations.length > 0)
            ? sheriffLocations[0] : undefined;

        return sheriffLocation;
    }

    public joinOnSheriffLocations(
        query: PostgresSelect,
        dbTableName: string,
        dbTableJoinCol: string = 'sheriff_id',
        sheriffsAlias: string = 's',
        sheriffLocationsAlias: string = 'sl'

    ) {
        const sheriffLocationService = Container.get(SheriffLocationService);

        query
            .join(
                sheriffLocationService.dbTableName,
                sheriffLocationsAlias,
                `${sheriffLocationsAlias}.sheriff_id=${sheriffsAlias}.sheriff_id`
            );

        return query;
    }

    async getAll(locationId?: string, options?: EffectiveQueryOptions) {
        const {
            startDate,
            endDate
        } = options || {
            startDate: moment().startOf('day').toISOString(),
            endDate: moment().endOf('day').toISOString()
        };

        const userService = Container.get(UserService) as UserService;
        const sheriffLocationService = Container.get(SheriffLocationService) as SheriffLocationService;
        const locationService = Container.get(LocationService) as LocationService;

        const query = this.getSelectQuery();

        if (locationId) {
            const currentLocationSheriffs = await this.getSheriffIdsByCurrentLocation(locationId, options) as string[];
            const homeLocationSheriffs = await this.getSheriffIdsByHomeLocation(locationId, options) as string[];

            query.where('sheriff_id IN ?', [...currentLocationSheriffs, ...homeLocationSheriffs]);
        }

        const rows = await this.executeQuery<Sheriff>(query.toString());

        const results = rows.map(async entity => {
            const { id, homeLocationId, badgeNo } = entity;
            const userEntity = await userService.getBySheriffId(id);
            
            if (userEntity) {
                entity.user = userEntity as User;
            }

            if (entity.homeLocationId) {
                const homeLocationEntity = await locationService.getById(entity.homeLocationId);
                if (homeLocationEntity) {
                    entity.homeLocation = homeLocationEntity;
                }
            }

            const sheriffLocationEntities = await sheriffLocationService.getBySheriffId(id);
            const sheriffLocationEntity = this.pickCurrentLocation(sheriffLocationEntities);
            if (sheriffLocationEntity) {
                entity.currentLocation = sheriffLocationEntity;
                entity.currentLocationId = sheriffLocationEntity.locationId;
                const currentLocationEntity = await locationService.getById(sheriffLocationEntity.locationId);
                if (currentLocationEntity) {
                    entity.currentLocation.location = currentLocationEntity;
                }
            }


            return entity;
        });

        return Promise.all(results);
    }

    async getSheriffIdsByCurrentLocation(locationId: string, options?: EffectiveQueryOptions) {
        const sheriffsAlias: string = 's';
        const sheriffLocationsAlias: string = 'sl';

        const query = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, sheriffsAlias)
                .field(`${sheriffsAlias}.sheriff_id`)
                .field(`${sheriffLocationsAlias}.location_id`);

        this.joinOnSheriffLocations(query, this.dbTableName, this.primaryKey);
        query.where(`${sheriffLocationsAlias}.location_id = '${locationId}'`);
        
        const queryOptions = {
            fieldAlias: sheriffLocationsAlias 
        } as EffectiveQueryOptions;

        options = options ? Object.assign({}, options, queryOptions): queryOptions;
        query.where(this.getEffectiveWhereClause(options));

        query.order(`${sheriffLocationsAlias}.${this.effectiveField}`);
        query.order(`${sheriffLocationsAlias}.${this.effectiveTimeField}`);

        const rows = await this.executeQuery<any>(query.toString());
        const ids = rows.reduce((acc: string[], curr: any) => {
            acc.push(curr.sheriff_id);
            return acc;
        }, [] as string[]);

        return ids;
    }

    async getSheriffIdsByHomeLocation(locationId: string, options?: EffectiveQueryOptions) {
        const sheriffsAlias: string = 's';
        const sheriffLocationsAlias: string = 'sl';

        const query = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, sheriffsAlias)
                .field(`${sheriffsAlias}.sheriff_id`)
                .field(`${sheriffsAlias}.home_location_id`, 'location_id');

       query.where(`${sheriffsAlias}.home_location_id='${locationId}'`);

        const rows = await this.executeQuery<any>(query.toString());
        const ids = rows.reduce((acc: string[], curr: any) => {
            acc.push(curr.sheriff_id);
            return acc;
        }, [] as string[]);

        return ids;
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
