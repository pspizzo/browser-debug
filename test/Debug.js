'use strict';

const expect = require('chai').expect,
    sinon = require('sinon'),
    jsdom = require('jsdom-global');

describe('Debug', function () {
    afterEach(function () {
        // Restore all spies/stubs/etc
        sinon.restore();

        // Remove the module from the require cache after every test
        delete require.cache[require.resolve('../src/Debug')];

        // Clean up JSDOM
        this.jsdom && this.jsdom();
    });

    it('should not be enabled by default outside of a browser', function () {
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(0);
    });

    it('should enable logging manually', function () {
        const Debug = require('../src/Debug');

        Debug.setLevel(3);
        expect(Debug.level, 'Wrong debug level').to.equal(3);
    });

    it('should enable "log" with debug level 1', function () {
        const Debug = require('../src/Debug'),
            fakeConsole = sinon.stub(console, 'log');

        Debug.setLevel(1);
        Debug.log('Log');
        expect(fakeConsole.callCount, 'log: console.log not called').to.equal(1);
        Debug.debug('Debug');
        expect(fakeConsole.callCount, 'debug: console.log called').to.equal(1);
        Debug.trace('Trace');
        expect(fakeConsole.callCount, 'trace: console.log called').to.equal(1);
    });

    it('should enable "log" and "debug" with debug level 2', function () {
        const Debug = require('../src/Debug'),
            fakeConsole = sinon.stub(console, 'log');

        Debug.setLevel(2);
        Debug.log('Log');
        expect(fakeConsole.callCount, 'log: console.log not called').to.equal(1);
        Debug.debug('Debug');
        expect(fakeConsole.callCount, 'debug: console.log not called').to.equal(2);
        Debug.trace('Trace');
        expect(fakeConsole.callCount, 'trace: console.log called').to.equal(2);
    });

    it('should enable "log", "debug", and "trace" with debug level 3', function () {
        const Debug = require('../src/Debug'),
            fakeConsole = sinon.stub(console, 'log');

        Debug.setLevel(3);
        Debug.log('Log');
        expect(fakeConsole.callCount, 'log: console.log not called').to.equal(1);
        Debug.debug('Debug');
        expect(fakeConsole.callCount, 'debug: console.log not called').to.equal(2);
        Debug.trace('Trace');
        expect(fakeConsole.callCount, 'trace: console.log not called').to.equal(3);
    });

    it('should not enable any logging without a "debug" query parameter', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(0);
    });

    it('should not enable any logging with an invalid "debug" query parameter', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/?debug=a' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(0);
    });

    it('should not enable any logging if debug query parameter is 0', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/?debug=0' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(0);
    });

    it('should enable "log" if debug query parameter is 1', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/?debug=1' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(1);
    });

    it('should enable "debug" if debug query parameter is 2', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/?debug=2' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(2);
    });

    it('should enable "trace" if debug query parameter is 3', function () {
        this.jsdom = require('jsdom-global')('', { url: 'https://example.com/?debug=3' });
        const Debug = require('../src/Debug');
        expect(Debug.level).to.equal(3);
    });

});