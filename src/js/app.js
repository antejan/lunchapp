import Marionette from 'marionette';

var app = new Marionette.Application({
    regions: {
        'error': '#alert',
        'content': '#content',
        'popup': '#popup'
    }
});

export {app};