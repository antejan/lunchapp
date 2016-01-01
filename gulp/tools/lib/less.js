"use strict";

var _ = require("lodash"),
    gulpLess = require('gulp-less');

/**
 * @mixin GulpToolsCSS
 */
module.exports = function (gulp, tools) {

    /**
     * Less minimization
     *
     * @param {String|String[]} files
     * @param {Object} [opts]
     * @returns {Stream}
     */
    var less = function (files, opts) {
        opts = _.defaults({}, opts, less.options);

        var lessStream = tools.src(files, opts)
            .pipe(gulpLess(opts));

        return tools.css(lessStream, opts);
    };

    /**
     * Less options
     */
    less.options = {
        relativeUrls: true
    };

    return less;
};
