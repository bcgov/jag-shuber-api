import { DateType } from './types';
import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';

export function getDateString(date?:DateType):string{
    const dateMoment = date ? moment(date) : moment().startOf('day');
    return dateMoment.format('YYYY-MM-DD');
}