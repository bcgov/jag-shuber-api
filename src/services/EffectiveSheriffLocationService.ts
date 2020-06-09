import moment from 'moment';
import { AutoWired } from 'typescript-ioc';

import { DatabaseService } from '../infrastructure/DatabaseService';

export interface EffectiveQueryOptions {
    startDate?: string;
    endDate?: string;
    includeExpired?: boolean;
    fieldAlias?: string;
    effectiveField?: string;
    expiryField?: string;
}

@AutoWired
export abstract class EffectiveSheriffLocationService<T> extends DatabaseService<T>{
    protected effectiveField = 'start_date';
    protected expiryField = 'end_date';
    protected effectiveTimeField = 'start_time';
    protected expiryTimeField = 'end_time';

    /**
     * Builds where clause for something like:
     * SELECT 
	 *  s.sheriff_id, 
	 *  sl.location_id,
	 *  DATE(sl.start_date - interval '1 days') as preview_loan_date,
	 *  sl.start_date,
	 *  sl.end_date
     * FROM sheriff AS s INNER JOIN sheriff_location AS sl ON (sl.sheriff_id=s.sheriff_id) 
     * WHERE 
     *  (sl.location_id = '<someguid>') 
     *  AND sl.end_date >= DATE('2020-06-10') -- is it in progress
     *  AND DATE(sl.start_date - interval '7 days') <= DATE('2020-06-10')
     * ORDER BY sl.start_date ASC, sl.start_time asc
     * @param options
     */
    protected getEffectiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().startOf('day').toISOString(),
            fieldAlias = undefined,
            effectiveField = this.effectiveField,
            expiryField =  this.expiryField
        } = options;

        const previewDays = 7;

        let clause = this.squel.expr();

        const effectiveFieldStr = fieldAlias ? `${fieldAlias}.${effectiveField}` : effectiveField;
        const expiryFieldStr = fieldAlias ? `${fieldAlias}.${expiryField}` : expiryField;

        // Add on the where for the effective date
        clause = this.squel.expr()
            .and(`${expiryFieldStr} >= DATE('${startDate}')`)
            .and(`DATE(${effectiveFieldStr} - INTERVAL '${previewDays.toString()} days') <= DATE('${startDate}')`)
        
        return clause;
    }

    protected getActiveWhereClause(options: EffectiveQueryOptions = {}) {
        const {
            startDate = moment().startOf('day').toISOString(),
            fieldAlias = undefined,
            effectiveField = this.effectiveField,
            expiryField =  this.expiryField
        } = options;

        const previewDays = 7;

        let clause = this.squel.expr();

        const effectiveFieldStr = fieldAlias ? `${fieldAlias}.${effectiveField}` : effectiveField;
        const expiryFieldStr = fieldAlias ? `${fieldAlias}.${expiryField}` : expiryField;

        // Add on the where for the effective date
        clause = this.squel.expr()
            .and(`${expiryFieldStr} >= DATE('${startDate}')`);
            // .and(`DATE(${effectiveFieldStr} - INTERVAL '${previewDays.toString()} days') <= DATE('${startDate}')`)
        
        return clause;
    }
}

