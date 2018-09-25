import { Courthouse } from '../models/Courthouse';
import { DatabaseService } from '../infrastructure/DatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class CourthouseService extends DatabaseService<Courthouse> {
    fieldMap = {
        courthouse_id: 'id',
        courthouse_cd: 'code',
        courthouse_name: 'name',
        location: 'location',
        parent_courthouse_id: 'parentCourthouseId',
        region_id: 'regionId'
    };

    constructor() {
        super('courthouse', 'courthouse_id');
    }
}