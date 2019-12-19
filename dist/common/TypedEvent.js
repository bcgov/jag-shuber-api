"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Typed Event represents an event that can be listened to
 */
class TypedEvent {
    constructor() {
        this.listeners = [];
        this.listenersOnce = [];
        this.on = (listener) => {
            this.listeners.push(listener);
            return {
                dispose: () => this.off(listener)
            };
        };
        this.once = (listener) => {
            this.listenersOnce.push(listener);
        };
        this.off = (listener) => {
            var callbackIndex = this.listeners.indexOf(listener);
            if (callbackIndex > -1)
                this.listeners.splice(callbackIndex, 1);
        };
        this.emit = (event) => {
            /** Update any general listeners */
            this.listeners.forEach((listener) => listener(event));
            /** Clear the `once` queue */
            this.listenersOnce.forEach((listener) => listener(event));
            this.listenersOnce = [];
        };
        this.pipe = (te) => {
            return this.on((e) => te.emit(e));
        };
    }
}
exports.TypedEvent = TypedEvent;
//# sourceMappingURL=../../src/dist/common/TypedEvent.js.map