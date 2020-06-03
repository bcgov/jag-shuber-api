import moment from 'moment';
import { PostgresSelect, select } from 'squel';

import { AutoWired, Inject, Container } from 'typescript-ioc';

import { SYSTEM_USER_DISPLAY_NAME} from '../common/authentication';

import { DatabaseService } from '../infrastructure/DatabaseService';
import { EffectiveQueryOptions } from '../infrastructure/ExpirableDatabaseService';

import { UserService } from './UserService';
import { SheriffLocationService } from './SheriffLocationService';
import { LocationService } from './LocationService';

import { Sheriff } from '../models/Sheriff';
import { SheriffLocation } from '../models/SheriffLocation';
import { Location } from '../models/Location';
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

    protected effectiveField = "effective_date";
    protected expiryField = "expiry_date";

    protected getEffectiveSelectQuery(options: EffectiveQueryOptions = {}): PostgresSelect {
        const {
            includeExpired = false
        } = options;
        // Get the standard query
        const query = this.getSelectQuery();

        query.where(this.getEffectiveWhereClause(options));
        console.log('getEffectiveSelectQuery');
        console.log(query.toString());
        return query;
    }

    public getEffectiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().startOf('day').toISOString(),
            endDate = moment().endOf('day').toISOString(),
            includeExpired = false,
            fieldAlias = undefined,
            effectiveField = this.effectiveField,
            expiryField =  this.expiryField
        } = options;

        let clause = this.squel.expr();

        if (!includeExpired) {
            const effectiveFieldStr = fieldAlias ? `${fieldAlias}.${effectiveField}` : effectiveField;
            const expiryFieldStr = fieldAlias ? `${fieldAlias}.${expiryField}` : expiryField;
            // Add on the where for the effective date
            clause = this.squel.expr()
                .and(`DATE('${endDate}') >= ${effectiveFieldStr}`)
                .and(
                    this.squel.expr()
                        .or(`${expiryField} IS NULL`)
                        .or(`Date('${startDate}') < ${expiryFieldStr}`)
                );
        }
        return clause;
    }

    pickCurrentLocation(sheriffLocations: SheriffLocation[]) {
        let sheriffLocation: SheriffLocation | undefined = undefined;
        let matchingLocations: SheriffLocation[] = [];

        // Load up the start and end dates from the sheriffLocations module
        matchingLocations = (sheriffLocations && sheriffLocations.length > 0)
            ? sheriffLocations
                .filter((location) => {
                    const { startDate, endDate, startTime, endTime } = location as SheriffLocation;
                    // We need to show sheriffs the sheriff loan in / loan out icons 7 days prior to the actual assignment
                    const currentMoment = moment().utc().startOf('day');
                    const startMoment = moment(startDate).utc().startOf('day');
                    const endMoment = moment(endDate).utc().startOf('day');
                    const pendingStartOffsetMoment = moment()
                        .utc().startOf('day').add(1, 'week');

                    const startDateIsSameOrBeforeStart = startMoment.isSameOrBefore(pendingStartOffsetMoment);
                    const endDateIsSameOrAfterNow = endMoment.isSameOrAfter(currentMoment);

                    return (startDateIsSameOrBeforeStart && endDateIsSameOrAfterNow);
                })
            : [];

        if (matchingLocations && matchingLocations[0]) {
            matchingLocations.sort((a: any, b: any) => b.startDate - a.startDate); // Prioritize partial days

            sheriffLocation = matchingLocations[0];

            /* if (id === '') { */
            console.log(`${matchingLocations.length} matching locations:`);
            console.log(matchingLocations);

            if (sheriffLocation) {
                console.log('sheriff is on loan:');
                console.log(sheriffLocation);
            }
            /* } */
        }

        return sheriffLocation;
    }

    async getAll(locationId?: string) {
        const userService = Container.get(UserService) as UserService;
        const sheriffLocationService = Container.get(SheriffLocationService) as SheriffLocationService;
        const locationService = Container.get(LocationService) as LocationService;

        const query = super.getSelectQuery();

        if (locationId) {
            const currentLocationSheriffs = await this.getSheriffIdsByCurrentLocation(locationId) as string[];
            const homeLocationSheriffs = await this.getSheriffIdsByHomeLocation(locationId) as string[];

            query.where('sheriff_id IN ?', [...currentLocationSheriffs, ...homeLocationSheriffs]);
        }
        
        const rows = await this.executeQuery<Sheriff>(query.toString());

        console.log('location sheriffs');
        console.log(rows);

        const results = rows.map(async entity => {
            const { id, homeLocationId } = entity;
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

    public joinOnSheriffs(
        query: PostgresSelect,
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

    async getSheriffIdsByCurrentLocation(locationId: string) {
        const sheriffsAlias: string = 's';
        const sheriffLocationsAlias: string = 'sl';

        const query = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, sheriffsAlias)
                .field(`${sheriffsAlias}.sheriff_id`)
                .field(`${sheriffLocationsAlias}.location_id`)

        this.joinOnSheriffs(query, this.dbTableName, this.primaryKey);
        query.where(`${sheriffLocationsAlias}.location_id = '${locationId}'`);
        
        query.order(`${sheriffLocationsAlias}.start_date`);
        query.order(`${sheriffLocationsAlias}.start_time`);

        const rows = await this.executeQuery<any>(query.toString());
        const ids = rows.reduce((acc: string[], curr: any) => {
            acc.push(curr.sheriff_id);
            return acc;
        }, [] as string[]);

        return ids;
    }

    async getSheriffIdsByHomeLocation(locationId: string) {
       const query = this.squel
            .select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
                .from(this.tableName, 's')
                .field(`s.sheriff_id`)
                .field(`s.home_location_id`, 'location_id')

        query.where(`s.home_location_id='${locationId}'`);

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
