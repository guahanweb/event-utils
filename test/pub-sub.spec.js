describe ('PubSub', function () {
    it ('should be defined', function () {
        expect(PubSub).toBeDefined();
        expect(typeof PubSub.subscribe).toEqual('function');
        expect(typeof PubSub.unsubscribe).toEqual('function');
        expect(typeof PubSub.publish).toEqual('function');
    });

    describe ('cross context behavior', function () {
        var context1, context2, dummy1, dummy2;
        beforeEach(function () {
            PubSub.unsubscribe('/test/context1');
            PubSub.unsubscribe('/test/context2');

            context1 = (function () {
                return {
                    test: function (data) {
                        PubSub.publish('/test/context1', data);
                    },

                    listen: function (ev, fn) {
                        PubSub.subscribe(ev, fn);
                    }
                };
            })();

            context2 = (function () {
                return {
                    test: function (a, b, c) {
                        PubSub.publish('/test/context2', a, b, c);
                    },

                    listen: function (ev, fn) {
                        PubSub.subscribe(ev, fn);
                    }
                };
            })();

            dummy1 = jasmine.createSpy('dummy1');
            dummy2 = jasmine.createSpy('dummy2');
        });

        it ('should allow subscription to one event at a time', function () {
            PubSub.subscribe('/test/context1', dummy1);
            PubSub.subscribe('/test/context2', dummy2);

            context1.test('foo');
            context2.test('a', 'b', 'c');

            expect(dummy1).toHaveBeenCalledWith('foo');
            expect(dummy2).toHaveBeenCalledWith('a', 'b', 'c');
        });

        it ('should allow subscription to multiple events at a time', function () {
            PubSub.subscribe('/test/context1 /test/context2', dummy1);

            context1.test('foo');
            expect(dummy1).toHaveBeenCalledWith('foo');
            dummy1.reset();

            context2.test('a', 'b', 'c');
            expect(dummy1).toHaveBeenCalledWith('a', 'b', 'c');
        });

        it ('should allow unsubscribing', function () {
            PubSub.subscribe('/test/context1', dummy1);
            context1.test('foo');

            expect(dummy1).toHaveBeenCalledWith('foo');
            PubSub.unsubscribe('/test/context1', dummy1);

            expect(dummy1.callCount).toEqual(1);
        });
    });
});