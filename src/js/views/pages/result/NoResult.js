import {Prototype, LayoutView} from 'marionette';
import template from './tpl/NoResult.hbs';
import {router} from '../../../router';

/**
 * @param {lunchState} model
 */
@Prototype({
    template,
    className: 'wrapper'
})
export class NoResult extends LayoutView {

    initialize() {
        this.listenTo(this.model.getTimeSource(), 'nextDay', this.onNextDay);
    }

    onNextDay() {
        router.navigate('/', {trigger: true});
    }

}
