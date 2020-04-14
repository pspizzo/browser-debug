'use strict';

var debug = 0;

function logger() {
    var _console;

    (_console = console).log.apply(_console, arguments);
};
function noop() {};

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
    log: noop,
    debug: noop,
    trace: noop
};

// Allow manually setting the debug level
Debug.setLevel = function (level) {
    this.level = parseInt(level || 0);
    // To improve performance, only define functions if the debug level is high enough
    Debug.log = this.level >= 1 ? logger : noop;
    Debug.debug = this.level >= 2 ? logger : noop;
    Debug.trace = this.level >= 3 ? logger : noop;
}.bind(Debug);

// Initialize the log level
Debug.setLevel(debug);

module.exports = Debug;