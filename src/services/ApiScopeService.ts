import { DatabaseService } from '../infrastructure/DatabaseService';
import { ApiScope } from '../models/ApiScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class ApiScopeService extends DatabaseService<ApiScope> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('api_scope', 'api_scope_id');
    }

}
