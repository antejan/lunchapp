import {Model, Prototype} from 'backbone';

@Prototype({
    defaults: {
        name: '',
        url: ''
    }
})
export class Lunch extends Model {

    destroyInCollection() {
        if (this.isNew()) {
            return Promise.resolve();
        }
        return Promise.resolve(this.sync('delete', this, {}));
    }

    /**
     * @param {object} data
     * @returns {Lunch}
     */
    static factoryFromData(data) {
        return new this(data);
    }

    /**
     * @returns {Lunch}
     */
    static factory() {
        return new this();
    }

}
