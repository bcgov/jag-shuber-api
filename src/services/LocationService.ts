import { Location } from '../models/Location';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class LocationService extends DatabaseService<Location> {
    fieldMap = {
        location_id: 'id',
        location_cd: 'code',
        location_name: 'name',
        parent_location_id: 'parentLocationId',
        region_id: 'regionId'
    };

    constructor() {
        super('location', 'location_id');
    }
}