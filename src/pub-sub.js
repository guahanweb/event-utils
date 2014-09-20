(function (scope) {
    var listeners = {};

    var emit = function (ev) {
        if (typeof listeners[ev] !== 'undefined' && listeners[ev].length > 0) {
            var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
            listeners[ev].forEach(function (fn) {
                fn.apply({}, args);
            });
        }
    };

    var on = function (evt, fn) {
        String(evt).split(' ').forEach(function (ev) {
            if (typeof listeners[ev] === 'undefined') {
                listeners[ev] = [];
            }

            if (typeof fn === 'function') {
                listeners[ev].push(fn);
            }
        });
    };

    var off = function (evt, fn) {
        String(evt).split(' ').forEach(function (ev) {
            if (typeof listeners[ev] !== 'undefined') {
                if (typeof fn === 'undefined') {
                    // Clear all
                    listeners[ev] = [];
                } else {
                    // Remove all occurrences of this function
                    var len = listeners[ev].length;
                    while (len) {
                        if (fn === listeners[ev][len-1]) {
                            listeners[ev].splice(len-1, 1);
                        }
                        len--;
                    }
                }
            }
        });
    };

    scope.PubSub = {
        publish: emit,
        subscribe: on,
        unsubscribe: off
    };
})(this||window);