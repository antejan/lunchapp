import {Model} from 'backbone';
import {AbstractLunches} from '../collection/AbstractLunches';

/**
 * @class LunchState
 */
export class LunchState extends Model {

    /**
     * @param {User} user
     */
    setUser(user) {
        this.set('user', user);
    }

    /**
     * @returns {User}
     */
    getUser() {
        return this.get('user');
    }

    /**
     * @param {TimeSource} timeSource
     */
    setTimeSource(timeSource) {
        this.set('timeSource', timeSource);
    }

    /**
     * @returns {TimeSource}
     */
    getTimeSource() {
        return this.get('timeSource');
    }

    /**
     * @param {SavedLunches} savedLunches
     */
    setSavedLunches(savedLunches) {
        this.set('savedLunches', savedLunches);
    }

    /**
     * @returns {SavedLunches}
     */
    getSavedLunches() {
        return this.get('savedLunches');
    }

    /**
     * @param {TodayLunches} todayLunches
     */
    setTodayLunches(todayLunches) {
        this.set('todayLunches', todayLunches);
    }

    /**
     * @returns {TodayLunches}
     */
    getTodayLunches() {
        return this.get('todayLunches');
    }

    /**
     * @returns {Lunch[]|[]}
     */
    getLunchesWithMaxPoints() {
        return this.getTodayLunches().getLunchesWithMaxPoints();
    }

    /**
     * We nned to merge
     * @returns {AbstractLunches}
     */
    getMergedLunches() {
        var mergedLunches = new AbstractLunches();
        mergedLunches.add(this.getSavedLunches().models);
        mergedLunches.add(this.getTodayLunches().models, {merge: true});
        this.listenTo(this.getSavedLunches(), 'add', () => {
            mergedLunches.add(this.getSavedLunches().models, {merge: true});
        });
        return mergedLunches;
    }

    /**
     * @param {Lunch} model
     * @param {boolean} toggle
     */
    toggleProposeToday(model, toggle) {
        if (toggle) {
            this.getTodayLunches().add(model);
        } else {
            model.destroyInCollection()
                .then(() => {
                    this.getTodayLunches().remove(model);
                });
        }
    }

    /**
     * Add new lunch to proposed
     * @param lunch
     * @param {boolean} save
     */
    proposeLunch(lunch, save) {
        this.getTodayLunches().add(lunch.clone());
        this.getSavedLunches().add(lunch);
        if (save) {
            lunch.save();
        }
    }

    /**
     * If we get to propose state we need to reset our TodayLunches collection
     */
    prepareToPropose() {
        let timeSource = this.getTimeSource();
        if (!timeSource.isStartedDay()) {
            timeSource.saveStartedDay();
            return Promise.all(this.getTodayLunches().invoke('destroyInCollection'))
                .then(() => {
                    this.getTodayLunches().reset();
                });
        }
        return Promise.resolve();
    }

}
