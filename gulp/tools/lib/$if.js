'use strict';

var $if = require('gulp-if');

module.exports = function (gulp, tools) {
    return function (task) {
        if (arguments.length === 2) {
            return $if.apply(this, arguments);
        } else {
            return $if(tools.env.isProduction(), task);
        }
    };
};
