'use strict';

var uglify = require('gulp-uglify');

module.exports = function (gulp, tools) {

    /**
     * Build JS. Just proxy to webpack
     *
     * @param {{}} config
     * @returns {*}
     */
    var js = function (config) {
        return tools.webpack(config);
    };

    /**
     * JavaScript minimization via UglifyJS
     *
     * @param {Object} [opts]
     *
     * @returns {Function}
     */
    js.minify = function (opts) {
        return tools.$if(uglify(opts));
    };

    return js;
};
