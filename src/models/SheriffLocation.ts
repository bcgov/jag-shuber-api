export interface SheriffLocation{
    id?: string;
    sheriffId: string;
    locationId: string;
    startDate: string;
    endDate?: string;
    // startTime: string;
    // endTime?: string;
    isPartial: number;
}
