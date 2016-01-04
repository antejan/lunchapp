import {Prototype, LayoutView} from 'marionette';
import template from './tpl/Result.hbs';
import {router} from '../../../router';

/**
 * @param {lunchState} model
 */
@Prototype({
    template,
    className: 'wrapper'
})
export class Result extends LayoutView {

    initialize() {
        this.listenTo(this.model.getTimeSource(), 'nextDay', this.onNextDay);
    }

    serializeData() {
        return {
            todayChooses: this.options.todayChooses.map((lunch) => lunch.toJSON())
        };
    }

    onNextDay() {
        router.navigate('/', {trigger: true});
    }

}
