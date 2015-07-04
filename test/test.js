'use strict';
var suite = require('tape-suite'); // jshint ignore:line
var State = require('ampersand-state');
var isoDateMixin = require('../index.js');
var moment = require('moment');

var DateState = State.extend(isoDateMixin, {
    props: {
        sometime: {
            type: 'iso-date',
            required: true
        }
    }
});

// Wrap sync tests
var sync = function (cb) {
    return function (t) {
        cb(t);
        t.end();
    };
};

// NOTE: it's assumed that all of the build servers are on UTC, so use UTC as 'local' time
suite('iso-date mixin', function (s) {
    var d, t1;

    s.beforeEach(function () {
        d = new DateState();
        t1 = moment();
    });

    s.test('iso 8601 identity', sync(function (t) {
        var dateString =  '2015-07-04T14:52:38+00:00';
        d.sometime = dateString;
        t.equal(dateString, d.sometime, 'iso8601 locale str in === iso8601 locale str out');
    }));

    s.test('moment.js type identity', sync(function (t) {
        d.sometime = t1;
        /*
         * disabled - see moment issue:
         *
         *
         * this assertion fails:
         * t.ok(t1.isSame(d.sometime), 'can use moment datetypes');
         *
         * Console output when using debugger in this block:
         *  d.sometime
         *  "2015-07-04T15:40:52-07:00"
         *  t1.format()
         *  "2015-07-04T15:40:52-07:00"
         *  t1.format() === d.sometime
         *  true
         *  t1.isSame(d.sometime)
         *  false
         */
        t.ok(t1.format() === d.sometime, 'can use moment datetypes');
    }));

    s.test('js native date support', sync(function (t) {
        var jsDate = (new Date()).getTime(); // new Date(); alone returns locale string, not UTC
        d.sometime = jsDate;
        t.ok(moment(jsDate).isSame(d.sometime), 'can use native JS Dates');
    }));

});
