'use strict';

var ghPages = require('gulp-gh-pages');

module.exports = function () {

    /**
     * Publish to gh-pages
     *
     * @param {String|String[]} files
     * @returns {Stream}
     */
    return function (files) {
        return this.src(files)
            .pipe(ghPages());
    };
};
