import { Pool, types } from 'pg';

// https://github.com/brianc/node-pg-types
types.setTypeParser(1700, (val) => (Number(val)))

const schema = process.env["API_DATABASE_SCHEMA"] || 'shersched';
const extensionsSchema = process.env["POSTGRES_EXT_SCHEMA"] || 'extensions';
const port = process.env["PGPORT"];
const user = process.env["PGUSER"];

const connection: { instance?: Pool } = {};

/**
 * Closes the ends the database connection pool and closes
 * all client connections to the database.
 * @export
 */
export async function closeConnectionPool() {    
    if (connection.instance) {
        console.log("Closing Database");
        await connection.instance.end();
        // todo: delete pool?
        delete connection.instance
    } else {
        console.log('No Pool.')
    }
}

/**
 * Gets an connection pool, creating one if one doesn't currently
 * exist
 * @export
 * @returns {Pool}
 */
export function getConnectionPool() {
    if (connection.instance) {
        return connection.instance;
    }

    // Create our connection pool
    const pool = new Pool();

    pool.on('error', (err) => {
        console.error(err);
    });

    pool.on('connect', async (client) => {
        client.on('error', err => {
            console.error(err);
        })
        const searchPath = `SET search_path TO ${schema},${extensionsSchema}`;
        await client.query(searchPath);
    })
    
    console.log(`DB Connection Pool Initialized using the '${user}' user`);
    console.log(`DB connection established on port: ${port}`)
    console.log('Adding schemas to search path: ', schema, extensionsSchema)

    // Store in our global instance to be used later
    connection.instance = pool;
    return connection.instance;
}

