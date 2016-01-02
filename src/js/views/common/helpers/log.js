import Handlebars from 'handlebars/runtime';
import {initial} from 'lodash';

Handlebars.registerHelper('log', function () {
    console.log.apply(console, initial(arguments));
});
