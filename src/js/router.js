import Backbone from 'backbone';

/**
 * @class Router
 */
class Router extends Backbone.Router {
    get routes() {
        return {
            'propose(/)': 'propose',
            'choose(/)': 'choose',
            'result(/)': 'result',
            '': 'lunch',
            '*params': '404'
        };
    }
}

export var router = new Router();