import Backbone from 'backbone';

// init infrastructure
import './vendor';

// views infrastructure
import './views';
import './error';

// configure controller
import './router';
import './controller';

// init application
import {app} from './app';

app.start();

Backbone.history.start({pushState: false});
