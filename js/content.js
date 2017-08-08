'use strict';

var orig = webpackJsonp;
webpackJsonp = function webpackJsonp() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    if (args[0][0] !== 0) {
        // Not in correct code chunk
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
    window.bar = parser;
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

/*

function(e, t, a) {
    "use strict";

    function n(e) {
        return "number" == typeof e && e > 0 ? e - 1 : u.MAX_GROUP_SIZE
    }

    function i(e) {
        return "number" == typeof e && e > 0 ? 1024 * e * 1024 : u.MAX_MEDIA_UPLOAD_SIZE
    }

    function r(e) {
        return "number" == typeof e && e > 0 ? 1024 * e * 1024 : u.MAX_FILE_SIZE
    }

    function o(e) {
        return "number" == typeof e && e > 0 ? 1024 * e : u.IMG_MAX_BYTES
    }

    function s(e) {
        return d.updateDocMimes(e), e
    }

    function l(e) {
        var t;
        c.Global.webcBucket = e.bucket || null;
        for (t in h)
            if ("undefined" != typeof e[t]) {
                var a, n, i = h[t];
                _.isArray(i) ? (a = i[0], n = i[1](e[t])) : (a = i, n = e[t]), a && (u[a] = n)
            }
        for (t in p.F) "undefined" != typeof e[t] && p.setFeature(t, e[t])
    }
    var u = a(14),
        c = a(33),
        d = a(116),
        f = a(44),
        p = a(59),
        h = {
            bucket: null,
            gifSearch: "SHOW_GIF_SEARCH",
            imageMaxEdge: "IMG_MAX_EDGE",
            imageMaxKBytes: ["IMG_MAX_BYTES", o],
            maxParticipants: ["MAX_GROUP_SIZE", n],
            maxSubject: "MAX_SUBJECT_LENGTH",
            media: ["MAX_MEDIA_UPLOAD_SIZE", i],
            maxFileSize: ["MAX_FILE_SIZE", r],
            statusV2: "STATUS_V2",
            statusV3: "STATUS_V3",
            docTypes: ["DOC_TYPES", s]
        },
        m = {
            handle: function(e) {
                var t = e.shift();
                "number" == typeof t.status && t.status >= 400 || l(t)
            },
            fetch: function() {
                return f.queryServerProps().then(function(e) {
                    "number" == typeof e.status && e.status >= 400 || l(e)
                })
            }
        };
    e.exports = m
}

*/
