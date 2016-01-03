import {Prototype, LayoutView} from 'marionette';
import template from './tpl/TimeIsUp.hbs';
import {router} from '../../../router';

@Prototype({
    template,
    className: 'wrapper',
    ui: {
        'button': 'button'
    },
    events: {
        'click @ui.button': 'onButtonClick'
    }
})
export class TimeIsUp extends LayoutView {

    onButtonClick() {
        router.navigate('/', {trigger: true});
    }

    serializeData() {
        return this.options;
    }

}
