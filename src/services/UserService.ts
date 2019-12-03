import { DatabaseService } from '../infrastructure/DatabaseService';
import { User } from '../models/User';
import { AutoWired } from 'typescript-ioc';

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

    constructor() {
        super('app_user', 'app_user_id');
    }

    getCurrentUser(){
        return this.currentUser;
    }
}
