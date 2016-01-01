'use strict';

var webpack = require('webpack');
var through = require('through');
var gutil = require('gulp-util');
var _ = require('lodash');

module.exports = function (gulp, tools) {
    return function (config, eachBuildCallback) {
        var stream = through();

        var callback = _.once(function () {
            stream.queue(null);
        });

        webpack(config, function(err, stats) {
            if (err) {
                gutil.log(gutil.colors.cyan('[webpack]'), gutil.colors.red(err));
            } else {
                gutil.log(gutil.colors.cyan('[webpack]'), stats.toString(config.stats));
            }

            callback();

            if (eachBuildCallback) {
                eachBuildCallback();
            }
        });

        return stream;
    };
};
