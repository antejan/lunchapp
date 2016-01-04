import {Prototype, LayoutView} from 'marionette';
import template from './tpl/TimeIsUp.hbs';
import {router} from '../../../router';

@Prototype({
    template,
    className: 'wrapper',
    ui: {
        'button': 'button',
        'buttonFiller': '.btn-filler'
    },
    events: {
        'click @ui.button': 'goNext'
    },
    timeLeft: 20
})
export class TimeIsUp extends LayoutView {

    onRender() {
        this.tick();
    }

    tick() {
        if (this.isDestroyed) {
            return;
        }

        if (this.timeLeft > 0) {
            this.timeLeft -= 1;
            setTimeout(this.tick.bind(this), 1000);
        } else {
            this.goNext();
        }
    }

    goNext() {
        router.navigate('/', {trigger: true});
    }

    serializeData() {
        return this.options;
    }

}
