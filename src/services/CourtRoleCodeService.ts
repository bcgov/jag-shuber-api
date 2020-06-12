import { CourtRoleCode } from '../models/CourtRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { CurrentUser } from '../infrastructure/CurrentUser';
import { AutoWired } from 'typescript-ioc';
import { PostgresInsert } from 'squel';

@AutoWired
export class CourtRoleCodeService extends ExpirableDatabaseService<CourtRoleCode> {
    fieldMap = {
        court_role_id: 'id',
        location_id: 'locationId',
        court_role_code: 'code',
        court_role_name: 'name',
        description: 'description', // For future use
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        sort_order: 'sortOrder',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('court_role_code', 'court_role_id');
    }

    async getAll(locationId?: string, includeProvincial?: boolean) {
        includeProvincial = includeProvincial || true;
        const query = super.getSelectQuery();
        if (locationId) {
            if (includeProvincial) {
                query.where(`location_id='${locationId}' OR location_id IS NULL`);
            } else {
                query.where(`location_id='${locationId}'`);
            }
        } else {
            query.where(`location_id IS NULL`);
        }

        query.order(`location_id IS NOT NULL, sort_order`);
        const rows = await this.executeQuery<CourtRoleCode>(query.toString());
        return rows;
    }

    async getByCode(code: string) {
        const query = this.getSelectQuery()
            .where(`court_role_code='${code}'`)
            .limit(1);

        const rows = await this.executeQuery<CourtRoleCode>(query.toString());
        return rows[0];
    }

    async getByCodeAndLocation(code: string, locationId?: string) {
        let query = this.getSelectQuery()
            .where(`court_role_code='${code}'`);

        query = (locationId !== null)
            ? query.where(`location_id='${locationId}'`)
            : query.where(`location_id IS NULL`);

        const rows = await this.executeQuery<CourtRoleCode>(query.toString());
        return rows[0];
    }

    protected getInsertQuery(entity: Partial<CourtRoleCode>): PostgresInsert {
        // Take the Field Map keys and map properties from the object
        // const createdByPropName = this.fieldMap[this.createdByField];
        // const createdByPropValue = entity[createdByPropName];
        // const updatedByPropName = this.fieldMap[this.updatedByField];
        // const updatedByPropValue = entity[createdByPropName];

        const { displayName } = this.currentUser() as CurrentUser;

        const createdByPropName = this.fieldMap[this.createdByField];
        entity[createdByPropName] = displayName;
        const updatedByPropName = this.fieldMap[this.updatedByField];
        entity[updatedByPropName] = displayName;

        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());

        this.setQueryFields(query, entity);

        // Take the Field Map keys and map properties from the object
        const objectPropName = this.fieldMap[this.effectiveField];
        const propValue = entity[objectPropName];

        if (!propValue) {
            // If the effective date field was not provided
            // Set it to NOW
            query.set(this.effectiveField, this.squel.str('NOW()'));
        }
        return query;
    }

}
