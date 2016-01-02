import Handlebars from 'handlebars/runtime';

/**
 * Format date/time with format
 */
Handlebars.registerHelper('moment', (context, {hash: {format}}) => {
    if (window.moment && context) {
        return moment(context).format(format);
    }
    return context;
});