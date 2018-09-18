import * as squel from 'squel';
import moment from 'moment';
const pgSquel = squel.useFlavour("postgres");

// append to string if non-empty
function _pad(str, pad) {
    return (str.length) ? str + pad : str;
}



export type UpdateFieldRowsBlockOptions = squel.CompleteQueryBuilderOptions & {
    valueTableAlias?: string;
    primaryKey: string;
};


export class UpdateFieldRowsBlock extends pgSquel.cls.InsertFieldValueBlock {
    private _valueTableAlias: string;
    private _primaryKey: string;

    constructor(options: Partial<UpdateFieldRowsBlockOptions>) {
        super(options);
        const { valueTableAlias = 'v', primaryKey } = options;
        if (!primaryKey) {
            throw "Primary Key Option is required for the UpdateFieldRowsBlock";
        }
        this._primaryKey = primaryKey;
        this._valueTableAlias = valueTableAlias;
    }

    setFieldsRows(fieldsRows, valueOptions: squel.SetFieldsOptions = {}) {
        super.setFieldsRows(fieldsRows, valueOptions);
    }

    _toParamString(options: Partial<squel.ToParamOptions & squel.BuildManyStringOptions> = {}): squel.ParamString {
        let { buildParameterized } = options;

        const nonPkFields = this._fields.filter(fn => fn != this._primaryKey);

        let setFieldString = nonPkFields
            .map(f => this._formatFieldName(f as string))
            .map(field => `${field} = ${this._valueTableAlias}.${field}`)
            .join(', ');

        const valueStrings: string[] = []
        const totalValues: any[] = [];

        for (let i = 0; i < this._values.length; ++i) {
            valueStrings[i] = '';

            for (let j = 0; j < this._values[i].length; ++j) {
                let ret =
                    this._buildString(this.options.parameterCharacter, [this._values[i][j]], {
                        buildParameterized: buildParameterized,
                        formattingOptions: this._valueOptions[i][j],
                    });

                ret.values.forEach(value => totalValues.push(value));

                valueStrings[i] = _pad(valueStrings[i], ', ');
                valueStrings[i] += ret.text;
            }
        }

        const valueTableString = `${this._formatTableAlias(this._valueTableAlias)}(${this._fields.map(f => this._formatFieldName(f as string)).join(', ')})`;
        return {
            text: nonPkFields.length > 0
                ? `SET (${setFieldString}) (VALUES (${valueStrings.join('), (')})) ${valueTableString}`
                : '',
            values: totalValues
        };
    }
}


export type FieldRowsUpdate = squel.PostgresUpdate & UpdateFieldRows;

export interface UpdateFieldRows {
    setFieldsRows<T extends { [field: string]: any }>(fields: T[], options?: squel.SetFieldsOptions): this;
}

export function updateRows(options: Partial<UpdateFieldRowsBlockOptions>): FieldRowsUpdate {
    return squel.update(options, [
        new pgSquel.cls.WithBlock(options),
        new pgSquel.cls.StringBlock(options, 'UPDATE'),
        new pgSquel.cls.UpdateTableBlock(options),
        // new pgSquel.cls.SetFieldBlock(options),
        new UpdateFieldRowsBlock(options),
        new pgSquel.cls.FromTableBlock(options),
        new pgSquel.cls.WhereBlock(options),
        new pgSquel.cls.OrderByBlock(options),
        new pgSquel.cls.LimitBlock(options),
        new pgSquel.cls.ReturningBlock(options),
    ]) as FieldRowsUpdate;
}

export default pgSquel;