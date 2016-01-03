import {Prototype, LayoutView} from 'marionette';
import template from './tpl/Timer.hbs';
import {app} from '../../../app';

/**
 * @property {TimeSource} model
 */
@Prototype({
    template,
    className: 'timer',
    ui: {
        'hh': '.timer-hh',
        'mm': '.timer-mm',
        'blinky': '.timer-blinky',
        'stage': '.timer-stage',
        'pause': '.ui-pause',
        'next': '.ui-next',
        'day': '.ui-day'
    },
    events: {
        'click @ui.pause': 'onClickPause',
        'click @ui.next': 'onClickNext',
        'click @ui.day': 'onClickDay'
    },
    modelEvents: {
        'tick': 'onTick'
    }
})
export class Timer extends LayoutView {

    /**
     * @param {moment} moment
     */
    onTick(moment) {
        this.ui.hh.text(moment.format('HH'));
        this.ui.mm.text(moment.format('mm'));
        this.ui.stage.text(this.model.getStageDescription());
    }

    toggleTicking(toggle) {
        this.ui.blinky.toggleClass('blinky', toggle);
    }

    onClickPause() {
        if (!this.paused) {
            this.paused = true;
            this.model.stopTicks();
            this.toggleTicking(false);
        } else {
            this.paused = false;
            this.model.startTicks();
            this.toggleTicking(true);
        }
        this.ui.pause.find('.fa').toggleClass('hidden');
    }

    onClickNext() {
        if (this.model.getStage() !== 'result') {
            this.ui.next.addClass('pushed');
            this.listenToOnce(this.model, 'ff:stop', () => {
                this.ui.next.removeClass('pushed');
            });
        }
        this.model.goNext();
    }

    onClickDay() {
        this.model.goNextDay();
    }

    serializeData() {
        return {
            hh: this.model.getHours(),
            mm: this.model.getMinutes(),
            stage: this.model.getStageDescription()
        };
    }

    /**
     * Show timer
     */
    static show(options) {
        if (!app.timer.currentView) {
            app.timer.show(new Timer(options));
        }
    }

}