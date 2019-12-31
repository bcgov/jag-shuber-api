import { GetFieldBlock, PostgresDelete, PostgresInsert, PostgresSelect, PostgresSquel, PostgresUpdate } from 'squel';
import { Database } from '../db/Database';
import { ServiceBase } from './ServiceBase';
import { ClientBase, Client } from 'pg';
import { DatabaseError, isDatabaseError, ValidationError } from '../common/Errors'
import { ValidateError, FieldErrors } from 'tsoa';
import { Inject, AutoWired } from 'typescript-ioc';
import { DatabaseRecordMetadata, DatabaseMetadataFieldMap } from './DatabaseRecordMetadata';

export type DatabaseResult<T> = { rows: T[] }

@AutoWired
export abstract class DatabaseService<T> extends ServiceBase<T> {
    @Inject
    private _db!: Database;
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

    constructor(protected tableName: string, protected primaryKey: string) {
        super();
    }

    abstract get fieldMap(): { [key: string]: string };

    /**
     * Returns the inverse of fieldMap!
     */
    protected get columnMap(): { [key: string]: string } {
        const fieldMap = this.fieldMap;
        return Object.keys(fieldMap).reduce((map: any, key: string) => {
            map[fieldMap[key]] = map[fieldMap[key]] && map[fieldMap[key]].concat(key) || [key];
            return map;
        }, {});
    }

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
            let returnError = error;
            DatabaseError.decorate(returnError);
            if (isDatabaseError(returnError)) {
                // Error codes can be found here: https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html
                if (error.code === "23505") {
                    const matches = error.detail.match(DatabaseError.PG_ERROR_23505_REGEX);
                    if (matches.length > 0) {
                        const field = matches[1];
                        const value = matches[2];
                        const message = "Already Exists";
                        const fieldErrors: FieldErrors = {};
                        fieldErrors[this.fieldMap[field]] = {
                            message,
                            value
                        }
                        returnError = new ValidateError(fieldErrors, "ValidationError");
                    }
                }
            }
            console.log('Error during DB Query:', `${returnError!.message}\r\n${returnError!.detail}`);
            throw returnError;
        }
    }

    protected getReturningFields(): GetFieldBlock {
        const returnFields = new this.squel.cls.GetFieldBlock({ autoQuoteAliasNames: true });
        returnFields.fields(this.fieldMap);
        return returnFields;
    }

    public select(queryAugmenter?: (q: PostgresSelect) => PostgresSelect, tableAlias?: string): Promise<T[]> {
        const query = this.squel.select({ autoQuoteAliasNames: true, tableAliasQuoteCharacter: "" })
            .from(this.tableName, tableAlias)
            .fields(tableAlias ? this.getAliasedFieldMap(tableAlias) : this.fieldMap);
        const newQuery = queryAugmenter ? queryAugmenter(query) : query;
        return this.executeQuery(newQuery.toString());
    }

    /**
     * Returns a {PostgresSelect} object that will by default select all records
     * from the table and map the fields using the services fieldMap.
     * 
     * If an [id] is specified then it will be used to add a where clause keying on
     * the record id
     *
     * @protected
     * @param {string} [id]
     * @returns {PostgresSelect}
     * @memberof DatabaseService
     */
    protected getSelectQuery(id?: string, tableAlias?: string): PostgresSelect {
        const query = this.squel.select({ autoQuoteAliasNames: true })
            .from(this.tableName, tableAlias)
            .fields(tableAlias ? this.getAliasedFieldMap(tableAlias) : this.getAliasedFieldMap(this.tableName));
        if (id) {
            query.where(tableAlias ? `${tableAlias}.${this.primaryKey}='${id}'` : `${this.primaryKey}='${id}'`)
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

    async getMetadataById(id: string): Promise<T & DatabaseRecordMetadata> {
        const query = this.getSelectQuery(id);
        query.fields(DatabaseMetadataFieldMap);
        const rows = await this.executeQuery<DatabaseRecordMetadata & T>(query.toString());
        return rows[0];
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

    async getWhereFieldEquals(fieldName: string, value: string | number): Promise<T[]> {
        const query = this.getSelectQuery()
            .where(`${this.columnMap[fieldName]}='${value}'`);
        
        const rows = await this.executeQuery<T>(query.toString());
        return rows;
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