
import { config as configureEnvironment } from 'dotenv';

const isTesting = process.argv.map(s => s.toLowerCase()).indexOf('--testing') > -1;
const envPath = process.env["DOTENV_PATH"];
console.log(`Loading environment vars from '${envPath}'`);

configureEnvironment({
    path:envPath
});

import db from './db/Database';
// Graceful shutdown on nodemon restart
process.once('SIGUSR2', async () => {
    console.log("Cleaning up app resources");
    await db.close();
    process.kill(process.pid, 'SIGUSR2');
});