// jscs:disable maximumLineLength
import fs from 'fs';
import os from 'os';
import path from 'path';

import tools from './tools';
import gutil from 'gulp-util';
import webpack from 'webpack';

import _ from 'lodash';

export default function (config, options) {
    let isDevelop = tools.env.isDevelopment();

    return _.extend({}, {
        entry: (function () {
            if (options.excludeEntry) {
                return {};
            }

            return {
                main: './src/js/bootstrap.js',
                vendor: [
                    'backbone.marionette'
                ]
            };
        })(),

        profile: true,
        watch: isDevelop,
        cache: isDevelop,
        debug: isDevelop,

        output: {
            filename: '[name].bundle.js',
            chunkFilename: '[id].bundle.js',
            path: config.assets + '/js',
            publicPath: config.baseUrl + '/js/'
        },

        externals: {},

        resolve: {
            extensions: ['', '.js', '.hbs'],
            root: [
                path.join(__dirname, 'node_modules'),
                path.join(__dirname, 'vendor'),
                path.join(__dirname, 'src')
            ],
            'alias': {
                'underscore': 'lodash',
                'marionette': 'backbone.marionette'
            }
        },

        module: {
            loaders: [
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    loader: 'file'
                },
                {
                    test: /\.hbs/,
                    loader: 'injectify'
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
                {
                    test: /\.js$/,
                    include: [
                        path.join(__dirname, '../src')
                    ],
                    loader: 'babel',
                    query: {
                        optional: ['runtime'],
                        cacheDirectory: os.tmpdir()
                    }
                }
            ]
        },

        plugins: (function () {
            var plugins = [
                new webpack.DefinePlugin({
                    APP_VERSION: JSON.stringify(config.version),
                    IS_DEVELOP: isDevelop,
                    BASE_URL: JSON.stringify(config.baseUrl),
                    'typeof window': JSON.stringify('object')
                })
            ];

            if (!options.excludeCommons) {
                plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'));
            }

            if (!isDevelop) {
                plugins = plugins.concat([
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                            warnings: false
                        }
                    }),
                    new webpack.optimize.AggressiveMergingPlugin()
                ]);
            } else {
                plugins = plugins.concat([
                    new webpack.SourceMapDevToolPlugin({
                        exclude: ['vendor.bundle.js'],
                        inline: true,
                        columns: false,
                        module: true
                    })
                ]);
            }

            return plugins;
        })(),

        stats: {
            colors: gutil.colors.supportsColor,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: true,
            version: true,
            cached: false,
            cachedAssets: false,
            reasons: false,
            source: false,
            errorDetails: false
        }
    }, options);
};
