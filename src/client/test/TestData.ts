import db from '../../db/Database';


export default class TestData {
    private static tablesToClear = [
        'sheriff_duty',
        'duty',
        'duty_recurrence',
        'assignment',
        'courtroom',
        'run',
        'sheriff',
        'shift',
        'courthouse',
        'region'
    ]
    constructor() {

    }

    async clearDatabase() {
        const client = await db.getClient();
        await db.transaction(async (client)=>{
            await TestData.tablesToClear.forEach(async (table) => {
                await client.query(`DELETE FROM ${table};`)
            });
        })
    }

    static randomString(length:number){
        let str = "";
        for(let i=0;i<length;++i){
            str=`${str}${String.fromCharCode(65+(Math.random()*25))}`
        }
        return str;
    }
}
