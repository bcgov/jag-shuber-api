import { Region } from '../models/Region';
import { DatabaseService } from '../infrastructure/DatabaseService';


export class RegionService extends DatabaseService<Region> {

    fieldMap: { [key: string]: string; } = {
        region_id: 'id',
        region_cd: 'code',
        region_name: 'name',
        location: 'location'
    };
    constructor() {
        super('region', 'region_id');
    } 

    async create(entity: Partial<Region>): Promise<Region> {
        const {
            name,
            code:regionCode,
            location = null
        } = entity;
        const code = regionCode ?
            regionCode :
            name!.trim().replace(" ", "").toUpperCase().slice(0, 12);

        const result = await super.create({name,code,location});
        return result;
    }
}