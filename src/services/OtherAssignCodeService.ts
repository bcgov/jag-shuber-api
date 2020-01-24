import { OtherAssignCode } from '../models/OtherAssignCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';
import { PostgresInsert } from 'squel';

@AutoWired
export class OtherAssignCodeService extends ExpirableDatabaseService<OtherAssignCode> {
    fieldMap = {
        other_assign_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('other_assign_code', 'other_assign_code');
    }

    protected getInsertQuery(entity: Partial<OtherAssignCode>): PostgresInsert {
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