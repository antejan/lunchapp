import path from 'path';
import webpackConfigFactory from './webpack.config.js';

export default function (gulp) {
    let packageConfig = require(path.join(__dirname, '..', 'package.json')),
        version = packageConfig.version,
        dist = path.join(__dirname, '..', 'dist'),
        assets = path.join(dist, 'assets', version),

        jsPath = path.join(assets, 'js'),
        cssPath = path.join(assets, 'css'),
        fontPath = path.join(assets, 'fonts'),
        imagesPath = path.join(assets, 'images'),

        baseUrl = 'assets/' + version;

    let config = {
        dist: dist,
        assets: assets,
        version: version,
        baseUrl: baseUrl,
        fontPath: fontPath,
        imagesPath: imagesPath,

        less: {
            src: './src/less/style.less',
            dest: cssPath,

            options: {
                ieCompat: false,
                paths: [
                    path.join(__dirname, '../src/less'),
                    path.join(__dirname, '../node_modules/bootstrap/less')
                ]
            }
        },

        html: {
            src: './src/*.html',
            dest: 'dist',
            baseUrl: baseUrl
        }

    };

    config.webpack = webpackConfigFactory(config, {});

    return config;
};
