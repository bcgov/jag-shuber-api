export interface ICrudService<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | undefined>;
    update(entity: Partial<T>): Promise<T>;
    create(entity: Partial<T>): Promise<T>;
    delete(id: string): Promise<void>;
}