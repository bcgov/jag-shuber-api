import * as squel from 'squel';
const pgSquel = squel.useFlavour("postgres");
export default pgSquel;