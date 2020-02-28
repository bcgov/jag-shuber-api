import { DatabaseService } from '../infrastructure/DatabaseService';
import { FrontendScope } from '../models/FrontendScope';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class FrontendScopeService extends DatabaseService<FrontendScope> {
    fieldMap = {
        frontend_scope_id: 'id',
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
        super('auth_frontend_scope', 'frontend_scope_id');
    }

    async getByScopeCode(code: string) {
        const query = this.getSelectQuery()
            .where(`scope_code='${code}'`)
            .limit(1);

        const rows = await this.executeQuery<FrontendScope>(query.toString());
        return rows[0];
    }
}
