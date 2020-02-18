
import './environment';  // Must be first
import app from './app';
const PORT = process.env.PORT || 3001;

import { GeneratorService } from './services/GeneratorService';

const generator = new GeneratorService();

app.listen(PORT).on('listening', async () => {
    console.log(`Sheriff Scheduling API started on port ${PORT}...`);
    console.log(`DATE: ${new Date().toString()}`);

    try {
        // Generate API Scopes - all system scopes must be present in the DB
        await generator.generateApiScopes();
        // Generate Frontend Scopes - all system scopes must be present in the DB
        await generator.generateFrontendScopes();
        // Generate Frontend Scope Permissions - all system permissions must be present in the DB
        await generator.generateFrontendScopePermissions();
        // Generate system roles and scopes
        await generator.generateSystemRolesAndScopes();

        // Generate assignment type codes
        await generator.generateCourtRoleCodes()
        await generator.generateJailRoleCodes()
        await generator.generateOtherAssignCodes()

        /**
         * Sheriffs in the system were built before we added in user functionality. As result, sheriffs currently being
         * loaded into the system via Liquibase don't have user accounts. We will need to create user accounts for any
         * sheriffs that don't have user accounts (which will be all of them as of the time of this writing 2020-01-12 yyyy-mm-dd).
         */
        await generator.generateUsersForSheriffs();

        // Create the test user account
        // TODO: Only if in dev!
        await generator.getOrCreateDevUser();
    } catch (error) {
        throw error;
    }
    
}); 
