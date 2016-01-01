'use strict';

var del = require('del'),
    through = require('through');

module.exports = function () {

    /**
     * Clear directory
     *
     * @param {String|String[]} files
     * @returns {Stream}
     */
    return function (files) {
        var stream = through();

        del(files, function () {
            stream.queue(null);
        });

        return stream;
    };
};
