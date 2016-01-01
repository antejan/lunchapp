'use strict';

var _ = require("lodash"),
    minify = require('gulp-minify-css'),
    prefix = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss');

module.exports = function (gulp, tools) {

    /**
     * CSS minimization
     *
     * @param {String|String[]} files
     * @param {Object} [opts]
     * @returns {Stream}
     */
    var css = function (files, opts) {
        var stream;

        opts = _.defaults({}, opts, css.options);

        if (typeof files === 'string' || Array.isArray(files)) {
            stream = this.src(files, opts);
        } else {
            stream = files;
        }

        return stream
            .pipe(css.minify(opts))
            .pipe(css.autoprefixer(opts.autoprefixer))
            .pipe(css.relative(opts))
            .pipe(css.rename(opts));
    };

    /**
     * CSS options
     *
     * @type {{relative: string, defaultReplaces: boolean, filename: string}}
     */
    css.options = {
        relativeTo: 'src/css',
        defaultReplaces: true,
        filename: 'style.css'
    };

    /**
     * CSS minimization
     *
     * @param {Object} [opts]
     * @returns {Function}
     */
    css.minify = function (opts) {
        opts = _.defaults({}, opts, css.options);

        return tools.$if(minify(opts));
    };

    /**
     * Autoprefix css
     *
     * @param {string[]} [options]
     * @returns {Stream}
     */
    css.autoprefixer = function (options) {
        return prefix(options || css.autoprefixer.options);
    };

    /**
     * Fix path's
     *
     * @param opts
     * @returns {*}
     */
    css.relative = function (opts) {
        opts = _.defaults({}, opts, css.options);

        return tools.$if(opts.defaultReplaces, tools.replace(/\((blocks|fonts|images)\//g, '(../$1/'));
    };

    /**
     * Change name to option seated
     *
     * @param {{filename: string}} opts
     * @returns {*}
     */
    css.rename = function (opts) {
        opts = _.defaults({}, opts, css.options);

        return tools.concat(opts.filename);
    };

    /**
     * @param {Array[]} processors
     * @param {{}} [options]
     */
    css.postcss = function (processors, options) {
        return postcss(processors, options);
    };

    /**
     * Autoprefixer options
     *
     * @type {string[]}
     */
    css.autoprefixer.options = ['last 2 version', '> 1%', 'Firefox >= 28', 'Opera 12.1'];

    return css;
};
