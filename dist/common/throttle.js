"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createThrottle(max) {
    if (typeof max !== 'number') {
        throw new TypeError('`createThrottle` expects a valid Number');
    }
    var cur = 0;
    var queue = [];
    function throttle(fn) {
        return new Promise(function (resolve, reject) {
            function handleFn() {
                if (cur < max) {
                    throttle.current = ++cur;
                    fn()
                        .then(function (val) {
                        resolve(val);
                        throttle.current = --cur;
                        if (queue.length > 0) {
                            queue.shift()();
                        }
                    })
                        .catch(function (err) {
                        reject(err);
                        throttle.current = --cur;
                        if (queue.length > 0) {
                            queue.shift()();
                        }
                    });
                }
                else {
                    queue.push(handleFn);
                }
            }
            handleFn();
        });
    }
    // keep copies of the "state" for retrospection
    throttle.current = cur;
    throttle.queue = queue;
    return throttle;
}
exports.createThrottle = createThrottle;
//# sourceMappingURL=../../src/dist/common/throttle.js.map