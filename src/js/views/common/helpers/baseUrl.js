import Handlebars from 'handlebars/runtime';

/**
 * Convert URLs like `images/dots.svg` to absolute URL `/assets/0.0.0/images/dots.svg`
 * Ignore full qualified urls and protocol relative
 */
Handlebars.registerHelper('baseUrl', function (context) {

    if (context.match(/^(https?|\/\/)/) || context.indexOf(BASE_URL) === 0) {
        return context;
    }

    return BASE_URL + '/' + context;
});
