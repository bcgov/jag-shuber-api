import { Courthouse } from '../models/Courthouse';
import { DatabaseService } from '../infrastructure/DatabaseService';


export class CourthouseService extends DatabaseService<Courthouse> {
    fieldMap = {
        courthouse_id: 'id',
        courthouse_cd: 'code',
        courthouse_name: 'name',
        location: 'location',
        parent_courthouse_id: 'parentCourthouseId',
        region_id: 'regionId',
        address_id: 'addressId'
    };

    constructor() {
        super('courthouse', 'courthouse_id');
    }
}