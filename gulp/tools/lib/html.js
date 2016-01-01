"use strict";

var _ = require("lodash"),
    template = require('gulp-template'),
    htmlmin = require('gulp-htmlmin');

/**
 * @mixin GulpToolsCSS
 */
module.exports = function (gulp, tools) {

    /**
     * Html processed throw lodash template system
     *
     * @param {String|String[]} htmlFiles
     * @param {Object} [opts]
     * @returns {Stream}
     */
    var html = function (htmlFiles, opts) {
        opts = _.defaults({}, opts, {
            IS_DEVELOP: this.env.isDevelopment()
        });

        return this.src(htmlFiles, opts)
            .pipe(template(opts))
            .pipe(html.minify(opts));
    };

    /**
     * Html minified
     *
     * @param {Object} [opts]
     * @returns {Stream}
     */
    html.minify = function (opts) {
        opts = _.defaults({}, opts, this.htmlOptions);

        return tools.$if(htmlmin(opts));
    };

    /**
     * Default options
     *
     * @type {{collapseWhitespace: boolean}}
     */
    html.options = {
        collapseWhitespace: true
    };

    return html;
};
