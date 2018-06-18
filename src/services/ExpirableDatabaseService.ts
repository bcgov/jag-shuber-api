import moment from 'moment';
import { PostgresInsert, PostgresSelect, PostgresUpdate, Expression } from 'squel';
import { DatabaseService } from "./DatabaseService";

export interface EffectiveQueryOptions {
    startDate?: string;
    endDate?: string;
    includeExpired?: boolean;
    fieldAlias?:string;
}

export default abstract class ExpirableDatabaseService<T> extends DatabaseService<T>{
    private effectiveField = "effective_date";
    private expiryField = "expiry_date";

    protected getEffectiveSelectQuery(options: EffectiveQueryOptions = {}): PostgresSelect {
        const {
            includeExpired = false
        } = options;
        // Get the standard query
        const query = this.getSelectQuery();

        query.where(this.getEffectiveWhereClause(options));
        return query;
    }

    public getEffectiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().toISOString(),
            includeExpired = false,
            fieldAlias = undefined
        } = options;
        const {
            endDate = startDate
        } = options;
        let clause = this.squel.expr();
        if (!includeExpired) {
            const effectiveField = fieldAlias ? `${fieldAlias}.${this.effectiveField}` : this.effectiveField;
            const expiryField = fieldAlias ? `${fieldAlias}.${this.expiryField}` : this.expiryField;
            // Add on the where for the effective date
            clause = this.squel.expr()
                .and(`DATE('${endDate}') >= ${effectiveField}`)
                .and(
                    this.squel.expr()
                        .or(`${expiryField} IS NULL`)
                        .or(`Date('${startDate}') < ${expiryField}`)
                );
        }
        return clause;
    }

    protected getInsertQuery(entity: Partial<T>): PostgresInsert {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);

        // Set the effective date field to NOW
        query.set(this.effectiveField, this.squel.str('NOW()'));
        return query;
    }

    protected getExpireQuery(id: string, expiryDate: string | moment.Moment): PostgresUpdate {
        const query = this.db.updateQuery(this.tableName)
            .set(this.expiryField, this.squel.str(`DATE('${moment(expiryDate).toISOString()}')`))
            .where(`${this.primaryKey}='${id}'`);
        return query;
    }

    async getAllEffective(options?: EffectiveQueryOptions): Promise<T[]> {
        const query = this.getEffectiveSelectQuery(options);
        const rows = await this.executeQuery<T>(query.toString());
        return rows.map((s: T) => this.filterNullValues(s));
    };

    async expire(id: string, expiryDate?: string): Promise<void> {
        if (!expiryDate) {
            expiryDate = moment().toISOString();
        }
        const query = this.getExpireQuery(id, expiryDate);
        await this.executeQuery(query.toString());
    }
}

