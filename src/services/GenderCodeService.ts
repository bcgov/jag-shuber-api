import { GenderCode } from '../models/GenderCode';
import ExpirableDatabaseService from '../infrastructure/ExpirableDatabaseService';
import { AutoWired } from 'typescript-ioc';

@AutoWired
export class GenderCodeService extends ExpirableDatabaseService<GenderCode> {
    fieldMap = {
        gender_code: 'code',
        description: 'description',
        expiry_date: 'expiryDate'
    };

    constructor() {
        super('gender_code', 'gender_code');
    }

}