'use strict';

var args = require('minimist')(process.argv);

module.exports = function () {
    return {

        /**
         * @var {string}
         */
        environment: String(args['environment'] || (args['production'] ? 'production' : 'development')),

        /**
         * @returns {boolean}
         */
        isDevelopment: function () {
            return this.is('development');
        },

        /**
         * @returns {boolean}
         */
        isProduction: function () {
            return this.is('production');
        },

        /**
         * @param {string} environment
         * @returns {boolean}
         */
        is: function (environment) {
            return this.environment === environment;
        }

    };
};
