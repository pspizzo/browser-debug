'use strict';

let debug = 0;

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
    log: function(...msg) { },
    debug: function(...msg) { },
    trace: function(...msg) { },
};

// Allow manually setting the debug level
Debug.setLevel = function(level) {
    this.level = parseInt(level || 0);
    // To improve performance, only define functions if the debug level is high enough
    if (this.level >= 1)  {
        this.log = function(...msg) { console.log(...msg); };
    } else {
        this.log = function(...msg) { };
    }
    if (this.level >= 2)  {
        this.debug = function(...msg) { console.log(...msg); };
    } else {
        this.debug = function(...msg) { };
    }
    if (this.level >= 3)  {
        this.trace = function(...msg) { console.log(...msg); };
    } else {
        this.trace = function(...msg) { };
    }
}.bind(Debug);

// Initialize the log level
Debug.setLevel(debug);

module.exports = Debug;
