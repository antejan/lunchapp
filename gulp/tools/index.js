'use strict';

var path = require('path'),
    register = require('./register');

var tools = module.exports = {};
tools.register = register;

register.registerModulesInDirectory(tools, path.join(__dirname, 'lib'));

tools.setGulp = function (gulp) {
    tools.gulp = gulp;
};

tools.getGulp = function () {
    return tools.gulp || require('gulp');
};
