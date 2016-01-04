import {Model, Prototype} from 'backbone';
import {sum} from 'lodash';

@Prototype({
    defaults: {
        name: '',
        url: ''
    }
})
export class Lunch extends Model {

    /**
     * @param {number} points
     * @param {User} user
     */
    setUserPoints(points, user) {
        let lunchPoints = this.getPoints();
        lunchPoints[user.getFirstName()] = points;
        this.setPoints(lunchPoints);
        this.updateTotalPoints();
    }

    /**
     * Sum up all points
     */
    updateTotalPoints() {
        this.set('totalPoints', sum(this.getPoints()));
    }

    /**
     * @param {User} user
     * @returns {number|undefined}
     */
    getUserPoints(user) {
        return this.getPoints()[user.getFirstName()];
    }

    /**
     * @returns {object}
     */
    getPoints() {
        return this.get('points') || {};
    }

    /**
     * @param {object} points
     */
    setPoints(points) {
        this.set('points', points);
    }

    /**
     * Workaround for localstorage adapter
     * @returns {Promise<User>}
     */
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
