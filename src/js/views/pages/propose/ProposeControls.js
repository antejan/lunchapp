import {Prototype, LayoutView} from 'marionette';
import {app} from '../../../app';
import {SuccessSave} from '../message/SuccessSave';
import template from './tpl/ProposeControls.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template,
    className: 'list-controls',
    ui: {
        'button': 'button'
    },
    events: {
        'click @ui.button': 'onClickSave'
    }
})
export class ProposeControls extends LayoutView {

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

}
