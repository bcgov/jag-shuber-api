import { GetFieldBlock, PostgresDelete, PostgresInsert, PostgresSelect, PostgresSquel, PostgresUpdate } from 'squel';
import { Database, default as db } from '../db/Database';
import { ServiceBase } from './ServiceBase';
import { ClientBase } from 'pg';

export type DatabaseResult<T> = { rows: T[] }

export abstract class DatabaseService<T> extends ServiceBase<T> {
    private _db: Database = db;
    protected get db() {
        return this._db;
    }

    private _dbClient?: ClientBase = undefined;
    set dbClient(client: ClientBase | undefined) {
        this._dbClient = client;
    }

    get dbClient(): ClientBase | undefined {
        return this._dbClient;
    }

    get squel(): PostgresSquel {
        return this.db.squel;
    }

    get dbTableName(): string {
        return this.tableName;
    }

    getAliasedFieldMap(alias: string) {
        return Object.keys(this.fieldMap).reduce((newFields, key) => {
            newFields[`${alias}.${key}`] = this.fieldMap[key];
            return newFields;
        }, {});
    }

    constructor(protected tableName: string, protected primaryKey: string, protected isExpirable: boolean = false) {
        super();
    }

    abstract get fieldMap(): { [key: string]: string };

    protected async executeQuery<T>(query: string): Promise<T[]> {
        try {
            let result: DatabaseResult<T> = { rows: [] };
            // if there is a dbClient defined, use it
            if (this.dbClient) {
                result = (await this.dbClient.query(query) as DatabaseResult<T>);
            } else {
                result = (await this.db.executeQuery(query) as DatabaseResult<T>);
            }
            return result.rows || [];
        } catch (error) {
            const errorMessage = `${error!.message}\r\n${error!.detail}`;
            console.log('Database Error:', errorMessage);
            throw new Error(errorMessage);
        }
    }

    protected getReturningFields(): GetFieldBlock {
        const returnFields = new this.squel.cls.GetFieldBlock({ autoQuoteAliasNames: true });
        returnFields.fields(this.fieldMap);
        return returnFields;
    }

    protected getSelectQuery(id?: string): PostgresSelect {
        const query = this.squel.select({ autoQuoteAliasNames: true })
            .from(this.tableName)
            .fields(this.fieldMap);
        if (id) {
            query.where(`${this.primaryKey}='${id}'`)
        }
        return query;
    }

    protected getInsertQuery(entity: Partial<T>): PostgresInsert {
        const query = this.db.insertQuery(this.tableName, this.primaryKey)
            .returning(this.getReturningFields());
        this.setQueryFields(query, entity);
        return query;
    }

    protected getUpdateQuery(entity: Partial<T>): PostgresUpdate {
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

    protected getUnsafeDeleteQuery(): PostgresDelete {
        return this.squel.delete()
            .from(this.tableName);
    }

    protected getDeleteQuery(id: string): PostgresDelete {
        return this.getUnsafeDeleteQuery()
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