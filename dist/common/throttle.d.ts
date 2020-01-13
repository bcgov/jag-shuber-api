declare function createThrottle(max: any): {
    (fn: any): Promise<{}>;
    current: number;
    queue: any[];
};
export { createThrottle };
