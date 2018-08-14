import { ClientBase, Pool, PoolClient } from 'pg';
import { FunctionBlock, InsertFieldValueMixin, PostgresInsert, PostgresSquel, PostgresUpdate } from 'squel';
import squel from './squel';
import { getConnectionPool, closeConnectionPool } from './connection';
import { Inject, AutoWired } from 'typescript-ioc';
import { CurrentUser } from '../infrastructure/CurrentUser';

@AutoWired
export class Database {
    @Inject
    private _currentUser!: CurrentUser;

    get currentUserName() {
        return this._currentUser.displayName.substr(0,32);        
    }

    private get connection() {
        return getConnectionPool();
    }

    getClient(): Promise<PoolClient> {
        return this.connection.connect();
    }

    get executeQuery() {
        const connection = this.connection;
        return connection.query.bind(connection);
    }
    insertQuery(tableName?: string, uuidField?: string): PostgresInsert {
        const query = squel.insert({ replaceSingleQuotes: true })
            .setFields(this.getUpdatedByFields())
            .setFields({
                created_by: this.currentUserName,
                created_dtm: squel.str('NOW()'),
                revision_count: 0
            })

        if (tableName) {
            query.into(tableName);
        }

        if (uuidField) {
            query.set(uuidField, squel.str('uuid_generate_v4()'));
        }
        return query;
    }
    getUpdatedByFields() {
        return {
            updated_by: this.currentUserName,
            updated_dtm: squel.str('NOW()'),
            revision_count: squel.str('revision_count+1')
        };
    }

    setExpiryFields(query: InsertFieldValueMixin, effectiveDate: string | FunctionBlock = squel.str('NOW()'), expiryDate: string = "") {
        if (effectiveDate) {
            query.set("effective_date", effectiveDate);
        }
        if (expiryDate) {
            query.set("expiry_date", expiryDate);
        }
    }

    updateQuery(tableName?: string): PostgresUpdate {
        const query = squel.update({ replaceSingleQuotes: true })
            .setFields(this.getUpdatedByFields());

        if (tableName) {
            query.table(tableName);
        }
        return query;
    }

    async transaction<T>(doWork: (client: ClientBase) => Promise<T>) {
        const client = await this.getClient();
        try {
            await client.query("BEGIN");
            const result = await doWork(client);
            await client.query("COMMIT");
            return result;
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }
    }

    get squel(): PostgresSquel {
        return squel;
    }
}

const database = new Database();
export default database;


