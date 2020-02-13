import { CourtRoleCode } from '../models/CourtRoleCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';
import { PostgresInsert } from 'squel';

@AutoWired
export class CourtRoleCodeService extends ExpirableDatabaseService<CourtRoleCode> {
    fieldMap = {
        court_role_id: 'id',
        court_role_code: 'code',
        description: 'description',
        location_id: 'locationId',
        effective_date: 'effectiveDate',
        expiry_date: 'expiryDate',
        created_by: 'createdBy',
        updated_by: 'updatedBy',
        created_dtm: 'createdDtm',
        updated_dtm: 'updatedDtm',
        revision_count: 'revisionCount'
    };

    constructor() {
        super('court_role_code', 'court_role_id');
    }

    async getAll(locationId?: string) {
        const query = super.getSelectQuery();
        if (locationId) {
            query.where(`location_id='${locationId}'`);
        } else {
            query.where(`location_id IS NULL`);
        };
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
            .where(`court_role_code='${code}'`)

        query = (locationId !== null) 
            ? query.where(`location_id='${locationId}'`) 
            : query.where(`location_id IS NULL`)

        const rows = await this.executeQuery<CourtRoleCode>(query.toString());
        return rows[0];
    }

    protected getInsertQuery(entity: Partial<CourtRoleCode>): PostgresInsert {
        const query = this.db.insertQuery(this.tableName) // Ignore the PK, we don't use a UUID here
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity, true);

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