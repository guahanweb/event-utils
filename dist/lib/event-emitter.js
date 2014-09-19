/*! event-utils - v0.0.1 - 2014-09-19
* https://github.com/guahanweb/event-utils
* Copyright (c) 2014 Garth Henson; Licensed MIT */
(function (scope) {
    /**
     * Attach a listener to the provided event name
     * @param {string} ev Event name
     * @param {function} fn Listener function
     */
    var on = function (ev, fn) {
        if (typeof this.listeners[ev] === 'undefined') {
            this.listeners[ev] = [];
        }

        if (typeof fn === 'function') {
            this.listeners[ev].push(fn);
        }
    };

    /**
     * Remove all occurrences of provided listener from event name.
     * If no listener is provided, all listeners are removed from
     * specified event.
     * @param {string} ev Event name
     * @param {function} fn Optional listener function
     */
    var off = function (ev, fn) {
        if (typeof this.listeners[ev] !== 'undefined') {
            if (typeof fn === 'undefined') {
                // Clear all
                this.listeners[ev] = [];
            } else {
                // Remove all occurrences of this function
                var len = this.listeners[ev].length;
                while (len) {
                    if (fn === this.listeners[ev][len-1]) {
                        this.listeners[ev].splice(len-1, 1);
                    }
                    len--;
                }
            }
        }
    };

    /**
     * Emit an event of the specified name, executing all registered listeners.
     * If any additional parameters are provided, they will be passed along to
     * the listeners as arguments.
     * @param {string} ev Event name
     * @param {mixed} [args...] Optional parameters for the listeners
     */
    var emit = function (ev) {
        if (typeof this.listeners[ev] !== 'undefined' && this.listeners[ev].length > 0) {
            var args = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
            this.listeners[ev].forEach(function (fn) {
                fn.apply({}, args);
            });
        }
    };

    scope.EventEmitter = {
        extend: function (obj) {
            obj.prototype.listeners = {};

            obj.prototype.on = function () {
                on.apply(this, arguments);
            };

            obj.prototype.off = function () {
                off.apply(this, arguments);
            };

            obj.prototype.emit = function () {
                emit.apply(this, arguments);
            };
        }
    };
})(this||window);
