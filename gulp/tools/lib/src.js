'use strict';

module.exports = function (gulp) {

    /**
     * Gulp src patched with plumber
     *
     * @param {String|String[]} files
     * @param {Object} [opts]
     * @returns {Stream}
     */
    return function (files, opts) {
        return this.protectStream(gulp.src(files, opts));
    };
};
