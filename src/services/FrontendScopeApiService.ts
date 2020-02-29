import { DatabaseService } from '../infrastructure/DatabaseService';
import { FrontendScopeApi } from '../models/FrontendScopeApi';
import { AutoWired, Container } from 'typescript-ioc';

import { FrontendScopeService } from './FrontendScopeService';
import { ApiScopeService } from './ApiScopeService';

import { FrontendScope } from '../models/FrontendScope';
import { ApiScope } from '../models/ApiScope';
import { CourtRoleCode } from '../models/CourtRoleCode';
import { stringify } from 'querystring';

@AutoWired
export class FrontendScopeApiService extends DatabaseService<FrontendScopeApi> {
    fieldMap = {
        frontend_scope_api_id: 'id',
        frontend_scope_id: 'frontendScopeId',
        api_scope_id: 'apiScopeId',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('auth_frontend_scope_api', 'frontend_scope_api_id');
    }

    async getById(id: string): Promise<FrontendScopeApi | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<FrontendScopeApi>(query.toString());

        // Attach FrontendScope by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        // Attach ApiScope by default for convenience
        const apiScopeService = Container.get(ApiScopeService);
        if (rows && rows.length > 0) {
            let row = rows[0];
            row.frontendScope = await frontendScopeService.getById(row.frontendScopeId);
            row.apiScope = await apiScopeService.getById(row.apiScopeId);

            return row;
        }

        return undefined;
    }

    async getByFrontendScopeId(frontendScopeId: string): Promise<FrontendScopeApi[]> {
        const rows = await this.getWhereFieldEquals('frontendScopeId', frontendScopeId);
        // Attach ApiScope by default for convenience
        const frontendScopeService = Container.get(FrontendScopeService);
        const apiScopeService = Container.get(ApiScopeService);
        return Promise.all(rows.map(async (row) => {
            row.frontendScope = await frontendScopeService.getById(row.frontendScopeId);
            row.apiScope = await apiScopeService.getById(row.apiScopeId);
            return row;
        }) as FrontendScopeApi[]);
    }

    async getByFrontendAndApiScope(frontendScope: FrontendScope, apiScope: ApiScope): Promise<boolean> {
        if (!frontendScope || !apiScope) return false;
        const query = this.getSelectQuery()
            .where(`frontend_scope_id = '${frontendScope.id}'`)
            .where(`api_scope_id = '${apiScope.id}'`);

        const rows = await this.executeQuery<FrontendScopeApi>(query.toString());
        return (rows && rows.length > 0);
    }

    async hasFrontendScope(frontendScope: FrontendScope): Promise<boolean> {
        if (!frontendScope) return false;
        const rows = await this.getWhereFieldEquals('frontendScopeId', frontendScope.id);
        return (rows && rows.length > 0);
    }

    async hasApiScope(apiScope: ApiScope): Promise<boolean> {
        if (!apiScope) return false;
        const rows = await this.getWhereFieldEquals('apiScopeId', apiScope.id);
        return (rows && rows.length > 0);
    }
}
