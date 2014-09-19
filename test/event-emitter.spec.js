describe ('Event Emitter', function () {
    var Obj;

    beforeEach(function () {
        Obj = function () {};
    });

    // Do we have the right object available?
    it ('should have the appropriate methods defined', function () {
        expect(EventEmitter).toBeDefined();
        expect(EventEmitter.extend).toBeDefined();
        expect(typeof EventEmitter.extend).toEqual('function');
    });

    // Let's be sure that our emitter is attaching the expected prototype additions
    it ('should attach the appropriate methods to the object', function () {
        var o = new Obj();
        expect(o.on).not.toBeDefined();
        expect(o.off).not.toBeDefined();
        expect(o.emit).not.toBeDefined();

        EventEmitter.extend(Obj);
        o = new Obj();
        expect(o.on).toBeDefined();
        expect(o.off).toBeDefined();
        expect(o.emit).toBeDefined();
    });

    // Test the actual processing of events
    describe ('execution', function () {
        var o;
        var dummy, dummy2, dummy3;

        beforeEach(function () {
            // Set up the empty prototype and attach Emitter
            Obj.prototype.test = function (data) {
                this.emit('test', data);
            };

            EventEmitter.extend(Obj);
            o = new Obj();

            // Get our spies ready!
            dummy = jasmine.createSpy('dummy');
            dummy2 = jasmine.createSpy('dummy2');
            dummy3 = jasmine.createSpy('dummy3');
        });

        // Attaching listeners
        it ('should attach events and fire them appropriately', function () {
            o.on('test', dummy);
            o.test('foo');
            expect(dummy).toHaveBeenCalled();
            expect(dummy).toHaveBeenCalledWith('foo');

            o.test();
            o.test();
            expect(dummy.callCount).toEqual(3);
        });

        // Removing listeners
        it ('should clear all listeners', function () {
            o.on('test', dummy);
            o.on('test', dummy2);
            o.on('test', dummy3);

            o.test();
            expect(dummy).toHaveBeenCalled();
            expect(dummy2).toHaveBeenCalled();
            expect(dummy3).toHaveBeenCalled();

            o.off('test');
            o.test();
            expect(dummy.callCount).toEqual(1);
            expect(dummy2.callCount).toEqual(1);
            expect(dummy3.callCount).toEqual(1);
        });

        // Be sure we remove specified listeners
        it ('should clear specific listeners when provided', function () {
            o.on('test', dummy);
            o.on('test', dummy2);

            o.test();
            expect(dummy).toHaveBeenCalled();
            expect(dummy2).toHaveBeenCalled();

            o.off('test', dummy2);
            o.test();
            expect(dummy.callCount).toEqual(2);
            expect(dummy2.callCount).toEqual(1);
        });

        // Be sure we remove all occurrences of a repeat listener
        it ('should clear all occurrences of listener', function () {
            o.on('test', dummy);
            o.on('test', dummy);
            o.on('test', dummy);
            o.on('test', dummy2);

            o.test();
            expect(dummy).toHaveBeenCalled();
            expect(dummy.callCount).toEqual(3);
            expect(dummy2).toHaveBeenCalled();
            expect(dummy2.callCount).toEqual(1);

            o.off('test', dummy);
            o.test();
            expect(dummy.callCount).toEqual(3);
            expect(dummy2.callCount).toEqual(2);
        });

        // Be sure emit passes along all additional arguments to listeners
        it ('should handle variable argument counts', function () {
            o.on('custom', dummy);
            o.emit('custom');
            expect(dummy).toHaveBeenCalledWith();

            o.emit('custom', 1);
            expect(dummy).toHaveBeenCalledWith(1);

            var data = { foo: 'bar' };
            o.emit('custom', 'a', 'b', 'c', data);
            expect(dummy).toHaveBeenCalledWith('a', 'b', 'c', data);
        });
    })
});