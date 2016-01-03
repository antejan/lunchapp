import Marionette from 'marionette';

var app = new Marionette.Application({
    regions: {
        'error': '#alert',
        'timer': '#timer',
        'content': '#content',
        'popup': '#popup'
    }
});

export {app};