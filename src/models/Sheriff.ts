import { User } from './User';
import { SheriffLocation } from './SheriffLocation';
import { Location } from './Location';

export interface Sheriff {
    id?: string;
    firstName: string;
    lastName: string;
    badgeNo: string;
    imageUrl?: string;
    homeLocationId: string;
    homeLocation?: Location;
    currentLocationId?: string;
    currentLocation?: SheriffLocation;
    rankCode: string;
    alias?: string;
    genderCode?: string;
    user?: User;
}
