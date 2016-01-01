var through = require("through");

module.exports = function () {

    /**
     * @param {String} search
     * @param {String} replacement
     * @param {Object} [options]
     * @returns {Stream}
     */
    return function (search, replacement) {
        return through(function (file) {
            file.contents = new Buffer(String(file.contents).replace(search, replacement));
            this.queue(file);
        });
    };
};
