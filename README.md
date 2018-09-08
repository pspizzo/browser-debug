# browser-debug
Client-side JavaScript utility for debug statements. Automatically turns on debugging if the query string in the browser has a "debug" parameter set to a number 1 or higher.  Higher values for "debug" can increase verbosity (1 = log, 2 = debug, 3 = trace).

## Installation
    npm install --save browser-debug

## Usage
    const Debug = require('browser-debug');
    // Log something, if enabled
    Debug.log('Something worth logging.');
    // Debug something, if enabled
    Debug.debug('We are getting more detail!');
    // Trace something, if enabled
    Debug.trace('Lots of logs here!');

If enabled, the log/debug/trace functions calls console.log() to print out the messages.

To enable debugging in your browser, change your URL from something like:

    https://my.awesome.site/home

to (level-1 logging):

    https://my.awesome.site/home?debug=1

or (max logging):

    https://my.awesome.site/home?debug=3

## Why?
If debugging is not enabled in the query parameters, you can avoid cluttering up the console with debugging messages.

But if you or an end-user is having problems with the web code, you can add the "debug" query parameter to get more details messages that can assist with troubleshooting.
