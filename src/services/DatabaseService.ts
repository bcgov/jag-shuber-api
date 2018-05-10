import { GetFieldBlock, PostgresDelete, PostgresInsert, PostgresSelect, PostgresSquel, PostgresUpdate } from 'squel';
import { Database, default as db } from '../db/Database';
import { ServiceBase } from './ServiceBase';

export abstract class DatabaseService<T> extends ServiceBase<T> {
    private _db: Database = db;
    protected get db() {
        return this._db;
    }
    get squel() : PostgresSquel {
        return this.db.squel;
    }

    constructor(protected tableName: string, protected primaryKey: string, protected isExpirable:boolean = false) {
        super();
    }

    abstract get fieldMap(): { [key: string]: string };

    protected async executeQuery<T>(query: string): Promise<T[]> {
        try {
            const result = (await this.db.executeQuery(query)) as { rows: T[] };
            return result.rows;
        } catch (error) {
            const errorMessage = `${error!.message}\r\n${error!.detail}`;
            console.log('Database Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    protected getReturningFields() : GetFieldBlock {
        const returnFields = new this.squel.cls.GetFieldBlock({ autoQuoteAliasNames: true });
        returnFields.fields(this.fieldMap);
        return returnFields;
    }

    protected getSelectQuery(id?: string) : PostgresSelect {
        const query = this.squel.select({ autoQuoteAliasNames: true })
            .from(this.tableName)
            .fields(this.fieldMap);
        if (id) {
            query.where(`${this.primaryKey}='${id}'`)
        }
        return query;
    }

    protected getInsertQuery(entity: Partial<T>) : PostgresInsert {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);
        return query;
    }

    protected getUpdateQuery(entity: Partial<T>) : PostgresUpdate {
        const query = this.db.updateQuery(this.tableName);

        // Map object properties into object
        this.setQueryFields(query, entity);

        // Set the returning fields
        query.returning(this.getReturningFields().toString());

        const primKeyPropName = this.fieldMap[this.primaryKey];
        const primaryKeyValue = entity[primKeyPropName];

        if (!primaryKeyValue) {
            throw Error("Id property required for updating records");
        }
        query.where(`${this.primaryKey}='${primaryKeyValue}'`);
        return query;
    }

    protected getDeleteQuery(id: string) : PostgresDelete {
        return this.squel.delete()
            .from(this.tableName)
            .where(`${this.primaryKey}='${id}'`);
    }

    protected setQueryFields(query, entity, includePK: boolean = false) {
        // Take the Field Map keys and map properties from the object
        Object.keys(this.fieldMap).filter(k => includePK || k !== this.primaryKey).forEach(dbField => {
            const objectPropName = this.fieldMap[dbField];
            const propValue = entity[objectPropName];
            query.set(dbField, propValue != undefined ? propValue : null);
        });
    }

    async getAll(): Promise<T[]> {
        const query = this.getSelectQuery();
        const rows = await this.executeQuery<T>(query.toString());
        return rows.map((s: T) => this.filterNullValues(s));
    };

    async getById(id: string): Promise<T | undefined> {
        const query = this.getSelectQuery(id);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async create(entity: Partial<T>): Promise<T> {
        const query = this.getInsertQuery(entity);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async update(entity: Partial<T>): Promise<T> {
        const query = this.getUpdateQuery(entity);
        const rows = await this.executeQuery<T>(query.toString());
        return rows[0];
    }

    async delete(id: string): Promise<void> {
        const query = this.getDeleteQuery(id);
        await this.executeQuery(query.toString());
    }

}