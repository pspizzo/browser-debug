'use strict';

let debug = 0;

function logger(...msg) { console.log(...msg); };
function noop(...msg) {};

if (typeof window !== 'undefined') {
    const queryString = window.location && window.location.search ? window.location.search : '';
    if (queryString) {
        const debugEntry = queryString.replace(/^\?/, '&').split('&').find(e => e.match(/^debug=/));
        if (debugEntry) {
            debug = parseInt(debugEntry.split('=', 2)[1] || 0);
        }
    }
}

const Debug = {
    log: noop,
    debug: noop,
    trace: noop,
};

// Allow manually setting the debug level
Debug.setLevel = function(level) {
    this.level = parseInt(level || 0);

    Debug.log = this.level >= 1 ? logger : noop;
    Debug.debug = this.level >= 2 ? logger : noop;
    Debug.trace = this.level >= 3 ? logger : noop;
}.bind(Debug);

// Initialize the log level
Debug.setLevel(debug);

module.exports = Debug;
