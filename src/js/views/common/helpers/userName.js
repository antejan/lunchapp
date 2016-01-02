import Handlebars from 'handlebars/runtime';

/**
 * Convert URLs like `images/dots.svg` to absolute URL `/assets/0.0.0/images/dots.svg`
 * Ignore full qualified urls and protocol relative
 */
Handlebars.registerHelper('userName', function (context) {
    return context.getFirstName ? context.getFirstName() : context;
});
