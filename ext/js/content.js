'use strict';

var orig = webpackJsonp;
webpackJsonp = function webpackJsonp() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args[0][0] !== 0) {
        return orig.apply(undefined, args);
    }
    var modules = args[1];
    if (!modules || !modules.findIndex) {
        return orig.apply(undefined, args);
    }
    var parserIdx = modules.findIndex(function (i) {
        return i && i.toString && i.toString().match(/gifSearch:"SHOW_GIF_SEARCH"/);
    });
    if (!parserIdx) {
        return orig.apply(undefined, args);
    }
    var parser = modules[parserIdx];
    if (!parser || !parser.toString) {
        return orig.apply(undefined, args);
    }
    function newParser(e, t, a) {
        parser(e, t, a);
        var oldHandle = e.exports.handle;
        var newHandle = function newHandle(param) {
            param[0].gifSearch = 'giphy';
            oldHandle(param);
        };
        e.exports.handle = newHandle;
    }
    args[1][parserIdx] = newParser;
    return orig.apply(undefined, args);
};
window.webpackJsonP = webpackJsonp;
