import moment from 'moment';
import { PostgresInsert, PostgresSelect, PostgresUpdate } from 'squel';
import { DatabaseService } from "./DatabaseService";

export interface EffectiveQueryOptions {
    startDate?: string;
    endDate?: string;
    includeExpired?: boolean;
}

export default abstract class ExpirableDatabaseService<T> extends DatabaseService<T>{
    private effectiveField = "effective_date";
    private expiryField = "expiry_date";

    protected getEffectiveSelectQuery(options: EffectiveQueryOptions = {}): PostgresSelect {
        const {
            startDate = moment().toISOString(),
            includeExpired = false
        } = options;
        const {
            endDate = startDate
        } = options;

        // Get the standard query
        const query = this.getSelectQuery();
        if (!includeExpired) {
            // Add on the where for the effective date
            query.where(this.squel.expr()
                .and(`DATE('${endDate}') >= ${this.effectiveField}`)
                .and(
                    this.squel.expr()
                        .or(`${this.expiryField} IS NULL`)
                        .or(`Date('${startDate}') < ${this.expiryField}`)
                )
            )
        }
        return query;
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

