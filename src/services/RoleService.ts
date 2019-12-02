import { DatabaseService } from '../infrastructure/DatabaseService';
import { Role } from '../models/Role';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class RoleService extends DatabaseService<Role> {
    fieldMap = {
        app_role_id: 'id',
        app_role_name: 'roleName',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('app_role', 'app_role_id');
    }
}
