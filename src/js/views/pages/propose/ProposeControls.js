import {Prototype, LayoutView} from 'marionette';
import {app} from '../../../app';
import {SuccessSave} from '../message/SuccessSave';
import {TimeIsUp} from '../message/TimeIsUp';
import template from './tpl/ProposeControls.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template,
    className: 'list-controls',
    ui: {
        'button': 'button',
        'warning': '.warning',
        'warningMessage': '.warning-message'
    },
    events: {
        'click @ui.button': 'onClickSave'
    }
})
export class ProposeControls extends LayoutView {

    initialize() {
        this.listenTo(this.model.getTimeSource(), 'tick', this.onTick);
    }

    onClickSave() {
        if (this.model.getTodayLunches().length) {
            this.model.getTodayLunches().invoke('save');
            app.content.show(new SuccessSave());
        } else {
            this.ui.button.addClass('shake');
            setTimeout(() => {
                this.ui.button.removeClass('shake');
            }, 1000);
        }
    }

    onTick() {
        let timeLeft = this.model.getTimeSource().leftInStage('propose');

        if (timeLeft <= 0) {
            app.content.show(new TimeIsUp({
                message: 'Suggest time was up to 11am.',
                button: 'Go choose something!'
            }));
            return;
        }

        if (timeLeft < 10 * 60 * 1000) {
            this.warned = true;
            this.ui.warning.removeClass('hidden-o');

            let message = 'Hurry up! You have ';
            if (Math.floor(timeLeft / 60000) <= 1) {
                message += 'less than one minute.';
            } else {
                message += 'only ' + Math.floor(timeLeft / 60000) + ' minutes left.';
            }
            this.ui.warningMessage.text(message);
        } else {
            this.warned = false;
            this.ui.warning.addClass('hidden-o');
        }
    }

}
