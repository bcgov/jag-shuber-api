import { DatabaseService } from '../infrastructure/DatabaseService';
import { ApiScope } from '../models/ApiScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class ApiScopeService extends DatabaseService<ApiScope> {
    fieldMap = {
        api_scope_id: 'id',
        api_scope_string: 'scopeString', // TODO: Remove this from the model and DB... we use scopeCode instead
        scope_name: 'scopeName',
        scope_code: 'scopeCode',
        system_scope_ind: 'systemScopeInd',
        description: 'description',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('api_scope', 'api_scope_id');
    }

}
