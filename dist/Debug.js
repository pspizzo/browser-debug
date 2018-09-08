'use strict';

var debug = 0;

if (typeof window !== 'undefined') {
    var queryString = window.location && window.location.search ? window.location.search : '';
    if (queryString) {
        var debugEntry = queryString.replace(/^\?/, '&').split('&').find(function (e) {
            return e.match(/^debug=/);
        });
        if (debugEntry) {
            debug = parseInt(debugEntry.split('=', 2)[1] || 0);
        }
    }
}

var Debug = {
    log: function log() {},
    debug: function debug() {},
    trace: function trace() {}
};

// Allow manually setting the debug level
Debug.setLevel = function (level) {
    this.level = parseInt(level || 0);
    // To improve performance, only define functions if the debug level is high enough
    if (this.level >= 1) {
        this.log = function () {
            var _console;

            (_console = console).log.apply(_console, arguments);
        };
    } else {
        this.log = function () {};
    }
    if (this.level >= 2) {
        this.debug = function () {
            var _console2;

            (_console2 = console).log.apply(_console2, arguments);
        };
    } else {
        this.debug = function () {};
    }
    if (this.level >= 3) {
        this.trace = function () {
            var _console3;

            (_console3 = console).log.apply(_console3, arguments);
        };
    } else {
        this.trace = function () {};
    }
}.bind(Debug);

// Initialize the log level
Debug.setLevel(debug);

module.exports = Debug;