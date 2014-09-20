JavaScript Event Utilities
==========================

### Lightweight event driven development for JavaScript

[![Build Status](https://travis-ci.org/guahanweb/event-utils.png?branch=dev)](https://travis-ci.org/guahanweb/event-utils)

We've all been there: we have a project where we create some really robust interaction between multiple objects, and
then as an afterthought, we really wish there were an easy way to hook into specific actions or mechanisms within our
workflows. After manually adding in custom event hooks over and over again, I finally decided to start putting some
of the more broadly applicable ones into one library for consumption.

## Available Utils

### Event Emitter

This is basically a lightweight version of the Node.js EventEmitter object. If you invoke the `EventEmitter.extend()`
method with an Object definition as a parameter, the provided Object's prototype will be extended with `on()`, `off()`
and `emit()` methods.

#### Usage:
```javascript
function Obj(term) {
    this.term = term;
}

Obj.prototype.test = function () {
    this.emit('test', this.term);
};

// Extend the object to emit events
EventEmitter.extend(Obj);

var o = new Obj('foo');
o.on('test', function (term) {
    console.log(term); // 'foo'
});
o.test();
```

### PubSub

This module gives a global mechanism by which an application can perform communication via the publish-subscribe
design pattern. The ability to communicate globally across modules and contexts can be quite useful when it comes
to workflows and other control mechanisms.

### Usage:
```javascript
// Context 1
(function () {
    PubSub.subscribe('test', function (data) {
        console.log('Received data: ', data);
    });
})();

// Context 2
(function () {
    PubSub.publish('test', {
        foo: 'bar'
    });
})();