import jquery from 'jquery';
import Marionette from 'marionette';
import Backbone from 'backbone';
import moment from 'moment';
import {Prototype} from './decorators/Prototype';
import 'backbone.localstorage';
import _ from 'lodash';

window.$ = window.jQuery = jquery;
window.Marionette = Marionette;
window.Backbone = Backbone;
window.moment = moment;
window._ = _;

Marionette.Prototype = Prototype;
Backbone.Prototype = Prototype;
