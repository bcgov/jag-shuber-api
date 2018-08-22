"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Typed Event represents an event that can be listened to
 */
var TypedEvent = /** @class */ (function () {
    function TypedEvent() {
        var _this = this;
        this.listeners = [];
        this.listenersOnce = [];
        this.on = function (listener) {
            _this.listeners.push(listener);
            return {
                dispose: function () { return _this.off(listener); }
            };
        };
        this.once = function (listener) {
            _this.listenersOnce.push(listener);
        };
        this.off = function (listener) {
            var callbackIndex = _this.listeners.indexOf(listener);
            if (callbackIndex > -1)
                _this.listeners.splice(callbackIndex, 1);
        };
        this.emit = function (event) {
            /** Update any general listeners */
            _this.listeners.forEach(function (listener) { return listener(event); });
            /** Clear the `once` queue */
            _this.listenersOnce.forEach(function (listener) { return listener(event); });
            _this.listenersOnce = [];
        };
        this.pipe = function (te) {
            return _this.on(function (e) { return te.emit(e); });
        };
    }
    return TypedEvent;
}());
exports.TypedEvent = TypedEvent;
//# sourceMappingURL=/Users/roughdraft/Projects/CGI/jag-shuber-api/dist/common/TypedEvent.js.map