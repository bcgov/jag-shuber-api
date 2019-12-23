import { DatabaseService } from '../infrastructure/DatabaseService';
import { SheriffService } from './SheriffService';
import { User } from '../models/User';
import { AutoWired, Inject, Container } from 'typescript-ioc';
import { Sheriff } from '../models/Sheriff';

export interface UserQuery {
    firstName?: string,
    lastName?: string,
    badgeNo?: string | number,
    sheriffRankCode?: string,
    locationId?: string,
    currentLocationId?: string,
    homeLocationId?: string
}

@AutoWired
export class UserService extends DatabaseService<User> {
    // TODO: Some of these fields are covered in the base classes
    fieldMap = {
        app_user_id: 'id',
        display_name: 'displayName',
        default_location_id: 'defaultLocationId',
        system_account_ind: 'systemAccountInd',
        sheriff_id: 'sheriffId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    @Inject
    private sheriffService!: SheriffService;

    constructor() {
        super('app_user', 'app_user_id');
    }

    getCurrentUser(){
        return this.currentUser;
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        // TODO: What if the location is on the sheriff, and not the user
        if (locationId) {
            query.where(`default_location_id='${locationId}'`);
            // query.where(`home_location_id='${locationId}' OR current_location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<User>(query.toString());

        const results = rows.map(async entity => {
            if (entity.sheriffId) {
                const sheriffEntity = await this.sheriffService.getById(entity.sheriffId);
                if (sheriffEntity) {
                    entity.sheriff = sheriffEntity as Sheriff;
                }
            }
            return entity;
        });

        return Promise.all(results);
    }

    async queryAll(params: UserQuery) {
        const query = super.getSelectQuery();
        // TODO: What if the location is on the sheriff, and not the user
        if (params.locationId) {
            query.where(`home_location_id='${params.locationId}' OR current_location_id='${params.locationId}'`);
        };

        if (params.homeLocationId) {
            query.where(`home_location_id='${params.homeLocationId}'`);
        };

        if (params.currentLocationId) {
            query.where(`current_location_id='${params.currentLocationId}'`);
        };

        // TODO: Search on the sheriff too!
        if (params.firstName) {
            query.where(`display_name LIKE '%${params.firstName}%'`);
        };

        if (params.lastName) {
            query.where(`display_name LIKE '%${params.lastName}%'`);
        };

        if (params.badgeNo) {
            query.where(`badge_no LIKE '%${params.badgeNo}%'`);
        };

        if (params.sheriffRankCode) {
            query.where(`sheriff_rank_code LIKE '%${params.sheriffRankCode}%'`);
        };

        const rows = await this.executeQuery<User>(query.toString());

        const results = rows.map(async entity => {
            if (entity.sheriffId) {
                const sheriffEntity = await this.sheriffService.getById(entity.sheriffId);
                if (sheriffEntity) {
                    entity.sheriff = sheriffEntity as Sheriff;
                }
            }
            return entity;
        });

        return Promise.all(results);
    }

    async generateUserForSheriff(sheriff: Sheriff): Promise<User | undefined> {
        try {
            const newUserEntity = await this.create({
                // TODO: We gotta do something better than this...
                displayName: `${sheriff.firstName} ${sheriff.lastName}`,
                systemAccountInd: 0,
                // siteminderId: 1, // TODO: We don't need these yet, they're just in the DB table
                // userAuthId: null, // TODO: We don't need these yet, they're just in the DB table
                defaultLocationId: sheriff.homeLocationId,
                sheriffId: sheriff.id,
                createdBy: 'DEV - BACKEND',
                updatedBy: 'DEV - BACKEND',
                createdDtm: new Date().toISOString(),
                updatedDtm: new Date().toISOString(),
                revisionCount: 0
            });

            console.log(`Generated user "${newUserEntity.id}" for sheriff_id: ${newUserEntity.sheriffId}, name: ${newUserEntity.displayName}`);
            return newUserEntity;
        
        } catch (err) {
            console.log(`Error generating user for sheriff_id: ${sheriff.id}`)
        }    
    }

    async generateUsersForSheriffs(): Promise<void> {
        // Get all the sheriffs
        const rows = await this.sheriffService.getAll();

        const rowCount = rows.length;

        const ops = rows.map(async (sheriffEntity, idx) => {
            // TODO: Set a limit, we'll need to throttle this or something... 
            // Increate the number of records and this starts to blow up, probably too much memory.
            if (!(idx < 10)) return;
            
            if (sheriffEntity.id) {
                const userEntity = await this.getBySheriffId(sheriffEntity.id);

                if (!userEntity) {
                    console.log(`Generating user for sheriff_id: ${sheriffEntity.id}`);
                    this.generateUserForSheriff(sheriffEntity);   
                }
            }
            return;
        });

        Promise.all(ops);
    }

    async getBySheriffId(sheriffId: string) {
        const query = this.getSelectQuery()
            .where(`sheriff_id='${sheriffId}'`)
            .limit(1);

        const rows = await this.executeQuery<User>(query.toString());
        return rows[0];
    }

    /**
     * Override DatabaseService's create method, with one that creates and links a sheriff profile to the user too.
     * @param entity
     */
    async create(entity: Partial<User>): Promise<User> {
        this.validateUser(entity);

        return await this.db.transaction(async ({ client, getService }) => {
            if (!entity.sheriffId && entity.sheriff && !entity.sheriff.id) {
                const sheriffService = getService<SheriffService>(SheriffService);
                const newSheriffEntity = await sheriffService.create(entity.sheriff);
                entity.sheriffId = newSheriffEntity.id;
            }

            const query = this.getInsertQuery(entity);
            const rows = await this.executeQuery<User>(query.toString());
            return rows[0];
        });
    }

    /**
     * Override DatabaseService's update method, with one that can update the user and sheriff profile in one call.
     * @param entity
     */
    async update(entity: Partial<User>): Promise<User> {
        this.validateUser(entity);

        return await this.db.transaction(async ({ client, getService }) => {
            if (!entity.sheriffId && entity.sheriff) {
                const sheriffService = getService<SheriffService>(SheriffService);
                const newSheriffEntity = await sheriffService.create(entity.sheriff);
                entity.sheriffId = newSheriffEntity.id;
            } else if (entity.sheriffId && entity.sheriff && (entity.sheriffId === entity.sheriff.id)) {
                const sheriffService = getService<SheriffService>(SheriffService);
                const newSheriffEntity = await sheriffService.update(entity.sheriff);
                entity.sheriffId = newSheriffEntity.id;
            }

            const query = this.getUpdateQuery(entity);
            const rows = await this.executeQuery<User>(query.toString());
            return rows[0];
        });
    }

    /**
     * Override DatabaseService's delete method, with one that can delete the user and sheriff profile in one call.
     * @param id
     */
    async delete(id: string): Promise<void> {
        const query = this.getDeleteQuery(id);
        await this.executeQuery(query.toString());
    }

    /**
     * Utility to link users to sheriff profiles automatically.
     */
    private linkUsersToSheriffProfiles() {

    }

    private validateUser(entity: Partial<User>) {
        return true;
    }
}
