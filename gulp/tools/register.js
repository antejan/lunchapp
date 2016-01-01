var fs = require('fs'),
    path = require('path'),
    _ = require('lodash');

/**
 * @returns {Gulp}
 */
var getGulp = function () {
    return require('./index').getGulp();
};

/**
 * @param {string} directory
 */
var scanDirectory = function (directory) {
    return fs.readdirSync(directory)
        .map(function (file) {
            return path.join(directory, file);
        })
        .filter(function (file) {
            return fs.statSync(file).isFile() && file.slice(-3) === '.js';
        })
        .map(function (file) {
            return {
                name: path.basename(file, '.js'),
                path: file
            };
        });
};

/**
 * @param {{name: string, path: string}[]} modules
 * @param {{}} root
 */
var registerLazyModules = function (modules, root) {
    modules.forEach(function (module) {
        var instance;

        Object.defineProperty(root, module.name, {
            get: function () {
                if (!instance) {
                    instance = require(module.path)(getGulp(), root);
                }

                return instance;
            }
        });
    });
};

module.exports = {

    /**
     * @param {object} root
     * @param {string} directory
     */
    registerModulesInDirectory: function (root, directory) {
        registerLazyModules(scanDirectory(directory), root);
    }

};
