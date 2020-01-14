import { TokenPayload } from '../common/authentication';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { SheriffService } from './SheriffService';
import { User } from '../models/User';
import { AutoWired, Inject, Container } from 'typescript-ioc';
import { Sheriff } from '../models/Sheriff';

export interface UserQuery {
    firstName?: string;
    lastName?: string;
    badgeNo?: string | number;
    sheriffRankCode?: string;
    locationId?: string;
    currentLocationId?: string;
    homeLocationId?: string
}

@AutoWired
export class UserService extends DatabaseService<User> {
    // TODO: Some of these fields are covered in the base classes
    fieldMap = {
        app_user_id: 'id',
        siteminder_id: 'siteminderId',
        user_auth_id: 'userAuthId',
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

    constructor() {
        super('app_user', 'app_user_id');
    }

    getCurrentUser(){
        return this.currentUser;
    }

    async getAll(locationId?: string) {
        const sheriffService = Container.get(SheriffService);

        const query = super.getSelectQuery();
        // TODO: What if the location is on the sheriff, and not the user
        if (locationId) {
            query.where(`default_location_id='${locationId}'`);
            // query.where(`home_location_id='${locationId}' OR current_location_id='${locationId}'`);
        };
        const rows = await this.executeQuery<User>(query.toString());

        const results = rows.map(async entity => {
            if (entity.sheriffId) {
                const sheriffEntity = await sheriffService.getById(entity.sheriffId);
                if (sheriffEntity) {
                    entity.sheriff = sheriffEntity as Sheriff;
                }
            }
            return entity;
        });

        return Promise.all(results);
    }

    async queryAll(params: UserQuery) {
        const sheriffService = Container.get(SheriffService);

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
                const sheriffEntity = await sheriffService.getById(entity.sheriffId);
                if (sheriffEntity) {
                    entity.sheriff = sheriffEntity as Sheriff;
                }
            }
            return entity;
        });

        return Promise.all(results);
    }

    async getBySheriffId(sheriffId: string) {
        const query = this.getSelectQuery()
            .where(`sheriff_id='${sheriffId}'`)
            .limit(1);

        const rows = await this.executeQuery<User>(query.toString());
        return rows[0];
    }

    async getByToken(tokenPayload: TokenPayload) {
        const {  guid, userId, type } = tokenPayload;
        if ((!guid || guid === '') && (!userId || userId === '')) {
            return;
        }

        const userService = Container.get(UserService);

        let query = userService.getSelectQuery()
            
        // Siteminder ID may be NULL or undefined in the token ONLY if in DEV env, with the siteminder
        // security definition on TokenController.getToken disabled (which allows us to debug the backend app)
        query = (guid && guid !== '') ? query.where(`siteminder_id='${guid}'`) : query; // TODO: Why does this extra NULL check not work? query.where(`siteminder_id=NULL`)
        query = (userId && userId !== '') ? query.where(`user_auth_id='${userId}'`): query;
        query = query.limit(1);

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
