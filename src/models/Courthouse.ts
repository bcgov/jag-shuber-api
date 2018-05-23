export interface Courthouse {
    id?: string;
    code: string;
    name: string;
    parentCourthouseId?: string;
    regionId: string;
    addressId?: string;
    location?: any;
}