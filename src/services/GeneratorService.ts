import moment from 'moment';
import uuidv4 from 'uuid/v4';
import { AutoWired, Container } from 'typescript-ioc';

import { createThrottle } from '../common/throttle';

import { ApiScopeService } from './ApiScopeService';
import { FrontendScopeService } from './FrontendScopeService';
import { UserService } from './UserService';

import { User } from '../models/User';
import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';

/**
 * Import the default system scopes configuration. These scopes, which are embedded in the user token, are required by the
 * frontend application and control which plugins, parts of the user interface, and which APIs a user can have access to.
 */
import { defaultFrontendScopes, defaultFrontendScopePermissions, defaultApiScopes } from '../common/systemScopes';

import {
    FAKEMINDER_IDIR, FAKEMINDER_GUID,
    SA_SITEMINDER_ID, SA_AUTH_ID,
    DEV_SA_SITEMINDER_ID, DEV_SA_AUTH_ID,
    TEST_USER_AUTH_ID, TEST_USER_DISPLAY_NAME,
    SYSTEM_USER_DISPLAY_NAME
} from '../common/authentication';
import { SheriffService } from './SheriffService';
import { Sheriff } from '../models/Sheriff';
import { FrontendScopePermission } from '../models/FrontendScopePermission';
import { FrontendScopePermissionService } from './FrontendScopePermissionService';

const MAX_RECORDS_PER_BATCH = 3;

@AutoWired
export class GeneratorService {
    /**
     * Re-generate any ApiScopes that are required by and missing in the system.
     * Default scopes are defined in src/common/systemScopes.ts
     */
    public async generateApiScopes() {
        const scopeService = Container.get(ApiScopeService);
        const ops = defaultApiScopes.map(async (scope: ApiScope) => {
            if (!(await scopeService.getByScopeCode(scope.scopeCode))) {
                return await scopeService.create(scope);
            }
        });

        await Promise.all(ops);
    }

    /**
     * Re-generate any FrontendScopes that are required by and missing in the system.
     * Default scopes are defined in src/common/systemScopes.ts
     */
    public async generateFrontendScopes() {
        const scopeService = Container.get(FrontendScopeService);
        const ops = defaultFrontendScopes.map(async (scope: FrontendScope) => {
            if (!(await scopeService.getByScopeCode(scope.scopeCode))) {
                return await scopeService.create(scope);
            }
        });

        await Promise.all(ops);
    }

    /**
     * Re-generate any FrontendScopes that are required by and missing in the system.
     * Default scopes are defined in src/common/systemScopes.ts
     */
    public async generateFrontendScopePermissions() {
        const scopeService = Container.get(FrontendScopeService);
        const scopePermissionService = Container.get(FrontendScopePermissionService);

        const frontendScopes = await scopeService.getAll();
        if (!(frontendScopes && frontendScopes.length > 0)) return;

        const outerOps = frontendScopes.map(async (scope: FrontendScope) => {
            const scopeEntity = await scopeService.getByScopeCode(scope.scopeCode);
            if (scopeEntity) {
                const innerOps = defaultFrontendScopePermissions
                    .filter(permissssion => permissssion.frontendScopeCode === scope.scopeCode)
                    .map(async (permission: FrontendScopePermission) => {
                        if (!(await scopePermissionService.getByCode(permission.permissionCode))) {
                            const newPermission = permission;
                            newPermission.frontendScopeId = scope.id; 
                            return await scopePermissionService.create(newPermission);
                        }
                    });
                
        
                await Promise.all(innerOps);
            }
        });

        await Promise.all(outerOps);
    }

    /**
     * Get or create the test user. The test user is only used when developing locally, where a Siteminder user does not
     * exist (unless configured using FakeMinder or some other mock implementation) and is granted full access to
     * frontend plugins and components, user interface features, and all API routes / OAuth scopes.
     */
    public async getOrCreateTestUser(): Promise<User | undefined> {
        // No admin user was found using the token, check to see if the test user account exists
        console.log(`Check to see if the test user account exists`);
        const userService = Container.get(UserService);
        let user = await userService.getByToken({ siteminderId: null, userId: TEST_USER_AUTH_ID });
        if (!user) {
            console.log(`Could not find the test user account - creating a new test account.`);
            user = await userService.create({
                displayName: TEST_USER_DISPLAY_NAME,
                siteminderId: uuidv4(), // TODO: Can't ignore unless we drop the constraint, but we won't have one, use a random value for now...
                userAuthId: TEST_USER_AUTH_ID, // 7 chars, same as IDIR
                defaultLocationId: '65b2e8fb-0d64-4f63-853c-76d8d359760e', // GUID Set a default location for the user
                systemAccountInd: 1, // Is the user a system user
                sheriffId: null, // If the user is a sheriff, this needs to be populated
                createdBy: SYSTEM_USER_DISPLAY_NAME,
                updatedBy: SYSTEM_USER_DISPLAY_NAME,
                createdDtm: moment(new Date()).toISOString(),
                updatedDtm: moment(new Date()).toISOString(),
                revisionCount:0
            } as User);
            console.log(`Using user account: ${user.displayName} [${user.id}]`);
        }

        return user;
    }

    /**
     * Sheriffs in the system were built before we added in user functionality. As result, sheriffs currently being
     * loaded into the system via Liquibase don't have user accounts. We will need to create user accounts for any
     * sheriffs that don't have user accounts (which will be all of them as of the time of this writing 2020-01-12 yyyy-mm-dd).
     */
    public async generateUsersForSheriffs(): Promise<void> {
        // Get all the sheriffs
        const sheriffService = Container.get(SheriffService);
        const userService = Container.get(UserService);
        const rows = await sheriffService.getAll();

        const rowCount = rows.length;

        // Something doesn't like it when 
        const throttle = createThrottle(MAX_RECORDS_PER_BATCH);
        const ops = rows.map(sheriffEntity => throttle(async() => {
            // TODO: Set a limit, we'll need to throttle this or something... 
            // Increate the number of records and this starts to blow up, probably too much memory.
            if (sheriffEntity.id) {
                const userEntity = await userService.getBySheriffId(sheriffEntity.id);
                if (!userEntity) {
                    console.log(`Generating user for sheriff_id: ${sheriffEntity.id}`);
                    await this.generateUserForSheriff(sheriffEntity);   
                }
            }
        }));

        await Promise.all(ops);
    }

    private async generateUserForSheriff(sheriff: Sheriff): Promise<User | undefined> {
        const userService = Container.get(UserService);

        try {
            const newUserEntity = await userService.create({
                displayName: `${sheriff.firstName} ${sheriff.lastName}`,
                systemAccountInd: 0,
                siteminderId: uuidv4(), // TODO: Can't ignore unless we drop the constraint, but we won't have one, use a random value for now...
                userAuthId: '',
                defaultLocationId: sheriff.homeLocationId,
                sheriffId: sheriff.id,
                createdBy: SYSTEM_USER_DISPLAY_NAME,
                updatedBy: SYSTEM_USER_DISPLAY_NAME,
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

    
}
