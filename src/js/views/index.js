import Handlebars from 'injectify/runtime';
import Marionette from 'backbone.marionette';
import extras from 'regions-extras';
extras.register({Handlebars, Marionette});

import 'injectify-view';
import 'injectify-include';
import './common';
