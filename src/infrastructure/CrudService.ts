export abstract class CrudService<T> {
    abstract getAll(): Promise<T[]>;
    abstract getById(id: string): Promise<T | undefined>;
    abstract update(entity: Partial<T>): Promise<T>;
    abstract create(entity: Partial<T>): Promise<T>;
    abstract delete(id: string): Promise<void>;
}