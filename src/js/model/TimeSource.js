import {Model, Prototype} from 'backbone';
import {TIME_STAGES, TIME_STAGES_LIMITS} from '../enums';
import moment from 'moment';
import {some, values} from 'lodash';
import {router} from '../router';

@Prototype({
    defaults: {
        time: new Date()
    }
})
export class TimeSource extends Model {

    initialize() {
        this.setTime(new Date());
        this.resetTime();

        this.tickEvery = 1000;
        this.msOnTick = 1000;
        this.startTicks();
    }

    /**
     * Start emitting tick events
     */
    startTicks() {
        this.tick();
    }

    /**
     * Stop emitting tick events
     */
    stopTicks() {
        clearTimeout(this.tickTimeout);
    }

    /**
     * Immediate restart ticks
     */
    restartTicks() {
        this.stopTicks();
        this.startTicks();
    }

    /**
     * Emit tick event
     */
    tick() {
        this.tickTimeout = setTimeout(this.tick.bind(this), this.tickEvery);
        this.trigger('tick', this.getMoment());
        this.incrementTime(this.msOnTick);
    }

    /**
     * @param {number} quantum ms
     */
    incrementTime(quantum = 1000) {
        let time = this.getTime();
        this.setTime(time.getTime() + quantum);
        this.checkNewDay();
    }

    /**
     * Check if new day begins
     */
    checkNewDay() {
        if (!this.day) {
            this.day = this.getDate();
        } else {
            if (this.day !== this.getDate()) {
                this.goNextDay();
                this.day = this.getDate();
            }
        }
    }

    /**
     * @param {number} amount ms
     */
    incrementTimeSmooth(amount) {
        let timeLimit = this.getTimeMs() + amount;

        this.trigger('ff:start');
        this.tickEvery = 50;
        this.msOnTick = 60 * 1000;

        let stopper = () => {
            if (this.getTimeMs() >= timeLimit) {
                this.tickEvery = 1000;
                this.msOnTick = 1000;
                this.stopListening(this, 'tick', stopper);
                this.trigger('ff:stop');
            }
        };

        this.listenTo(this, 'tick', stopper);
    }

    onDestroy() {
        this.stopTicks();
    }

    /**
     * @returns {Date}
     */
    getTime() {
        return this.get('time');
    }

    /**
     * @returns {number} ms
     */
    getTimeMs() {
        return this.getTime().getTime();
    }

    /**
     * @param {number|string|Date} time
     */
    setTime(time) {
        this.set('time', new Date(time));
    }

    /**
     * @returns {moment}
     */
    getMoment() {
        return moment(this.getTime());
    }

    /**
     * @returns {string}
     */
    getHours() {
        return this.getMoment().format('HH');
    }

    /**
     * @returns {string}
     */
    getMinutes() {
        return this.getMoment().format('mm');
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
    getStageDescription() {
        let stage = this.getStage();
        return `${_.capitalize(stage)} stage until ${TIME_STAGES_LIMITS[stage]}`;
    }

    /**
     * @param {string} stage
     * @returns {moment}
     */
    leftInStage(stage = this.getStage()) {
        return moment(TIME_STAGES_LIMITS[stage], 'h:m').diff(this.getMoment());
    }

    /**
     * Go to next stage
     * With a stop 5 minutes before this stage end
     */
    goNext() {
        let currentStage = this.getStage();
        let leftInStage = this.leftInStage();

        if (currentStage == 'result') {
            this.goNextDay();
        } else {
            if (leftInStage <= 5 * 60 * 1000) {
                this.incrementTimeSmooth(leftInStage);
            } else {
                this.incrementTimeSmooth(leftInStage - (5 * 60 * 1000));
            }
            this.restartTicks();
        }
    }

    /**
     * Trigger event in the case of the new day
     */
    goNextDay() {
        this.trigger('nextDay');
        this.resetStartedDay();
        this.resetTime();
        router.navigate('/', {trigger: true});
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
     * Reset time for demo
     */
    resetTime() {
        let time = this.getTime();
        time.setHours(10);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);
        this.setTime(time);
    }

    /**
     * @returns {TimeSource}
     */
    static factory() {
        return new this();
    }
    
}
