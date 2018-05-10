import { config as configureEnvironment } from 'dotenv';
import { ClientBase, Pool, types } from 'pg';
import { InsertFieldValueMixin, PostgresInsert, PostgresUpdate } from 'squel';
import squel from './squel';
configureEnvironment();
// https://github.com/brianc/node-pg-types
types.setTypeParser(1700,(val)=>(Number(val)))
export class Database {
    private pool: Pool;
    private _schema:string;
    constructor() {
        this._schema = process.env["API_DATABASE_SCHEMA"] || 'shersched';
        console.log(`DB Connection Pool Initialized using '${this._schema}' schema`);
        // Create our connection pool
        this.pool = new Pool();
        this.pool.on('connect', async (client) => {
            //    console.debug('Setting schema to shersched');
            await client.query(`SET search_path TO ${this._schema}`);
        })
        //console.debug('Database connection pool created');
    }

    get currentUser() {
        return 'API_USER'
    }

    getClient() {
        return this.pool.connect();
    }

    get executeQuery() {
        return this.pool.query.bind(this.pool);
    }
    insertQuery(tableName?: string, uuidField?: string): PostgresInsert {
        const query = squel.insert()
            .setFields(this.getUpdatedByFields())
            .setFields({
                created_by: this.currentUser,
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
            updated_by: this.currentUser,
            updated_dtm: squel.str('NOW()'),
            revision_count: squel.str('revision_count+1')
        };
    }

    setExpiryFields(query: InsertFieldValueMixin, effectiveDate = squel.str('NOW()'), expiryDate: string = "") {
        if (effectiveDate) {
            query.set("effective_date", effectiveDate);
        }
        if (expiryDate) {
            query.set("expiry_date", expiryDate);
        }
    }

    updateQuery(tableName?: string): PostgresUpdate {
        const query = squel.update()
            .setFields(this.getUpdatedByFields());

        if (tableName) {
            query.table(tableName);
        }
        return query;
    }

    async transaction<T>(doWork:(client:ClientBase)=>Promise<T>){
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

    async close(){
        if(this.pool){
            console.log("Closing Database");
            await this.pool.end();
            delete this.pool;
        }
    }

    get squel() {
        return squel;
    }
}

const database = new Database();
export default database;


