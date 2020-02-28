import { DatabaseService } from '../infrastructure/DatabaseService';
import { FrontendScope } from '../models/FrontendScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class AppScopeService extends DatabaseService<FrontendScope> {
    fieldMap = {
        role_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('auth_frontend_scope', 'frontend_scope_id');
    }
}
