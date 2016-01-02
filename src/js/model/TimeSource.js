import {Model, Prototype} from 'backbone';
import {TIME_STAGES, TIME_STAGES_LIMITS} from '../enums';
import moment from 'moment';
import {some, values} from 'lodash';

@Prototype({
    defaults: {
        time: new Date()
    }
})
export class TimeSource extends Model {

    /**
     * @returns {Date}
     */
    getTime() {
        return this.get('time');
    }

    /**
     * Going through limits finding the first that fits
     *
     * @returns {string}
     */
    getStage() {
        let time = moment(this.getTime());
        let stage = 0;

        some(values(TIME_STAGES_LIMITS), (limit, i) => {
            if (time.isBefore(moment(limit, 'h:m'))) {
                stage = i;
                return true;
            }
        });

        return TIME_STAGES[stage];
    }

    /**
     * @returns {string}
     */
    getDate() {
        return moment(this.getTime()).format('YYYY-MM-DD');
    }

    /**
     * @returns {boolean}
     */
    isStartedDay() {
        return this.getStartedDay() === this.getDate();
    }

    /**
     * Save the last day that we have started
     * Will trigger that on first call of propose stage of new day
     */
    saveStartedDay() {
        localStorage.setItem('startedDay', this.getDate());
    }

    /**
     * Get the last day that we have started
     */
    getStartedDay() {
        return localStorage.getItem('startedDay');
    }

    /**
     * Reset started day for demo
     */
    resetStartedDay() {
        localStorage.removeItem('startedDay');
    }

    /**
     * @returns {TimeSource}
     */
    static factory() {
        var time = new Date();
        // for demo purposes
        time.setHours(10);
        time.setMinutes(0);
        return new this({time: time});
    }
    
}
