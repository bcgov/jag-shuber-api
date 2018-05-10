import moment from 'moment';
import { DatabaseService } from "./DatabaseService";

export default abstract class ExpirableDatabaseService<T> extends DatabaseService<T>{
    private effectiveField = "effective_date";
    private expiryField = "expiry_date";

    protected getEffectiveSelectQuery(startDate?: string, endDate?: string) {
        if (!startDate) {
            startDate = moment().toISOString();
        }
        if (!endDate) {
            endDate = startDate;
        }
        // Add on the where for the effective date
        return this.getSelectQuery()
            .where(this.squel.expr()
                .and(`DATE('${endDate}') >= ${this.effectiveField}`)
                .and(
                    this.squel.expr()
                        .or(`${this.expiryField} IS NULL`)
                        .or(`Date('${startDate}') < ${this.expiryField}`)
                )
            )
    }

    async getAllEffective(startDate: string, endDate?: string): Promise<T[]> {
        const query = this.getEffectiveSelectQuery(startDate, endDate);
        const rows = await this.executeQuery<T>(query.toString());
        return rows.map((s: T) => this.filterNullValues(s));
    };

    async expire(id: string, expiryDate?: string): Promise<void> {
        if (!expiryDate) {
            expiryDate = moment().toISOString();
        }
        const query = this.db.updateQuery(this.tableName)
            .set(this.expiryField, this.squel.str(`DATE('${expiryDate}')`))
            .where(`${this.primaryKey}='${id}'`);
        await this.executeQuery(query.toString());
    }

    protected getInsertQuery(entity: Partial<T>) {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);

        // Set the effective date field to NOW
        query.set(this.effectiveField, this.squel.str('NOW()'));
        return query;
    }
}