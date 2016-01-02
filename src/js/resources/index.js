import {LunchState} from '../state/LunchState';
import {SavedLunches} from '../collection/SavedLunches';
import {TodayLunches} from '../collection/TodayLunches';
import {TimeSource} from '../model/TimeSource';
import {User} from '../model/User';
import {memoize} from 'lodash';

var resources = {

    /**
     * @returns {Promise<LunchState>}
     */
    lunchState() {
        var state = new LunchState();

        return Promise.all([this.timeSource(), this.user()])
            .then(([timeSource, user]) => {

                state.setTimeSource(timeSource);
                state.setUser(user);

                // time for middlewares like auth

                // dependencies
                return Promise.all([this.savedLunches(), this.todayLunches()])
                    .then(([savedLunches, todayLunches]) => {
                        state.setSavedLunches(savedLunches);
                        state.setTodayLunches(todayLunches);
                        return state;
                    });
            });
    },

    /**
     * return {TimeSource}
     */
    timeSource() {
        return TimeSource.factory();
    },

    /**
     * @return {User}
     */
    user() {
        return User.factory();
    },

    /**
     * @returns {SavedLunches}
     */
    savedLunches() {
        return SavedLunches.factory();
    },

    /**
     * @returns {TodayLunches}
     */
    todayLunches() {
        return TodayLunches.factory();
    }

};

// resources cache
['user', 'timeSource'].forEach(function (name) {
    resources[name] = memoize(resources[name]);
});

export {resources};
