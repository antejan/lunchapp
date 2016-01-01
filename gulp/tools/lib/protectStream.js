'use strict';

var plumber = require('gulp-plumber');

module.exports = function (gulp, tools) {
    return function (stream) {
        return stream.pipe(plumber({
            errorHandler: tools.handleErrors
        }));
    };
};
