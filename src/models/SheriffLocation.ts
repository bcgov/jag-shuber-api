import { Location } from './Location'

export interface SheriffLocation {
    id?: string;
    sheriffId: string;
    locationId: string;
    location?: Location;
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    isPartial: number;
}
