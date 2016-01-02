import {app} from './app';

/**
 * @class MainError
 */
class MainError {
    /**
     *
     */
    constructor() {
        _.bindAll(this, ['message', 'loadFail', 'fromXHR']);
    }

    /**
     *
     * @param {String} message
     * @param {Object} options
     * @returns {Error}
     */
    message(message, options) {
        console.log(_.extend({}, options, {
            message: message
        }));
    }

    /**
     *
     * @param {Object} e
     * @returns {Error}
     */
    loadFail(e) {
        this._log(e);
        return this.message('Unknown error');
    }

    /**
     *
     * @param {Object} e
     * @returns {Error}
     */
    fromXHR(e) {
        var json = e.responseJSON,
            message = [];

        if (json) {
            if (json.errors) {
                json = json.errors;
            }

            for (var title in json) {
                message.push(title + ': ' + json[title]);
            }
        } else {
            switch (e.status) {
                case 500:
                    message.push('500 Server error');
                    break;

                case 403:
                    message.push('403 Access denied');
                    break;

                default:
                    message.push('Disconnected');
                    break;
            }

            this._log(e);
        }

        return this.message(message.join('; '), {reload: false});
    }

    /**
     *
     */
    destroy() {
        if (this.errorView) {
            this.errorView.destroy();
            this.errorView = null;
        }
    }

    /**
     *
     * @param {Object} e
     * @private
     */
    _log(e) {
        console.error(e);
        if (e.stack) {
            console.log(e.stack);
        }
    }
}

export var error = new MainError();