import moment from 'moment';
import { PostgresInsert, PostgresSelect, PostgresUpdate, Expression } from 'squel';
import { DatabaseService } from "./DatabaseService";
import { AutoWired } from 'typescript-ioc';

export interface EffectiveQueryOptions {
    startDate?: string;
    endDate?: string;
    includeExpired?: boolean;
    fieldAlias?: string;
    effectiveField?: string;
    expiryField?: string;
}

@AutoWired
export default abstract class ExpirableDatabaseService<T> extends DatabaseService<T>{
    protected effectiveField = "effective_date";
    protected expiryField = "expiry_date";

    protected getEffectiveSelectQuery(options: EffectiveQueryOptions = {}): PostgresSelect {
        const {
            includeExpired = false
        } = options;
        // Get the standard query
        const query = this.getSelectQuery();

        query.where(this.getEffectiveWhereClause(options));
        console.log('getEffectiveSelectQuery');
        console.log(query.toString());
        return query;
    }

    public getActiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().startOf('day').toISOString(),
            fieldAlias = undefined,
            expiryField =  this.expiryField
        } = options;

        const expiryFieldStr = fieldAlias ? `${fieldAlias}.${expiryField}` : expiryField;

        // Add on the where for the effective date
        let clause = this.squel.expr()
            .and(`DATE('${startDate}') <= ${expiryFieldStr}`);

        return clause;
    }

    public getEffectiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().startOf('day').toISOString(),
            endDate = moment().endOf('day').toISOString(),
            includeExpired = false,
            fieldAlias = undefined,
            effectiveField = this.effectiveField,
            expiryField =  this.expiryField
        } = options;

        let clause = this.squel.expr();

        if (!includeExpired) {
            const effectiveFieldStr = fieldAlias ? `${fieldAlias}.${effectiveField}` : effectiveField;
            const expiryFieldStr = fieldAlias ? `${fieldAlias}.${expiryField}` : expiryField;
            // Add on the where for the effective date
            clause = this.squel.expr()
                .and(`DATE('${endDate}') >= ${effectiveFieldStr}`)
                .and(
                    this.squel.expr()
                        .or(`${expiryField} IS NULL`)
                        .or(`Date('${startDate}') < ${expiryFieldStr}`)
                );
        }
        return clause;
    }

    protected getInsertQuery(entity: Partial<T>): PostgresInsert {
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

    protected getExpireQuery(id: string, expiryDate: string | moment.Moment): PostgresUpdate {
        const query = this.db.updateQuery(this.tableName)
            .set(this.expiryField, this.squel.str(`DATE('${moment(expiryDate).toISOString()}')`))
            .where(`${this.primaryKey}='${id}'`);
        return query;
    }

    protected getUnexpireQuery(id: string): PostgresUpdate {
        const query = this.db.updateQuery(this.tableName)
            .set(this.expiryField, null)
            .where(`${this.primaryKey}='${id}'`);
        return query;
    }

    async getAllEffective(options?: EffectiveQueryOptions): Promise<T[]> {
        const query = this.getEffectiveSelectQuery(options);
        const rows = await this.executeQuery<T>(query.toString());
        return rows.map((s: T) => this.filterNullValues(s));
    };

    async getEffectiveWhereFieldEquals(fieldName: string, value: string | number, options?: EffectiveQueryOptions): Promise<T[]> {
        const query = this.getEffectiveSelectQuery(options)
            .where(`${this.columnMap[fieldName]}='${value}'`);

        const rows = await this.executeQuery<T>(query.toString());
        return rows;
    }

    async expire(id: string, expiryDate?: string): Promise<void> {
        if (!expiryDate) {
            expiryDate = moment().toISOString();
        }
        const query = this.getExpireQuery(id, expiryDate);
        await this.executeQuery(query.toString());
    }

    async unexpire(id: string): Promise<void> {
        const query = this.getUnexpireQuery(id);
        await this.executeQuery(query.toString());
    }
}

