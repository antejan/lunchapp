import fs from 'fs';
import injectify from 'injectify';

import 'injectify-view/inject';
import 'injectify-include/inject';

export default function (config) {

    injectify.installPlugin(function (injectify) {
        injectify.bus.on('init', function (event) {
            let names = [
                // Injectify
                'require',
                'include',
                'view',
                'region',
                'content'
            ];

            fs.readdirSync(__dirname + '/../../src/js/views/common/helpers')
                .map(file => file.replace(/\.js$/, ''))
                .map(file => names.push(file));

            let knownHelpers = event.handlebarsOptions.knownHelpers = {};
            event.handlebarsOptions.knownHelpersOnly = true;

            for (let name of names) {
                knownHelpers[name] = true;
            }
        });
    });

    injectify.installPlugin(function (injectify) {
        let trim = (str) => {
            return str.replace(/\s+/g, ' ');
        };

        injectify.walker.registerTransform('ContentStatement', function (node) {
            node.value = trim(node.value);
            node.original = trim(node.original);

            return node;
        });
    });
}
