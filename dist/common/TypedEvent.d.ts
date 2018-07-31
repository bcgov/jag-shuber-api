export interface Listener<T> {
    (event: T): any;
}
export interface Disposable {
    dispose(): any;
}
/**
 * Typed Event represents an event that can be listened to
 */
export declare class TypedEvent<T> {
    private listeners;
    private listenersOnce;
    on: (listener: Listener<T>) => Disposable;
    once: (listener: Listener<T>) => void;
    off: (listener: Listener<T>) => void;
    emit: (event: T) => void;
    pipe: (te: TypedEvent<T>) => Disposable;
}
