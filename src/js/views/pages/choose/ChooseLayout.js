import {Prototype} from 'marionette';
import {BaseLayout} from '../base/BaseLayout';
import template from './tpl/ChooseLayout.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template
})
export class ChooseLayout extends BaseLayout {

    serializeData() {
        // if nothing suggested, let's show saved lunches at least
        let todayLunches = this.model.getTodayLunches();

        if (!todayLunches.length) {
            todayLunches.set(this.model.getSavedLunches().invoke('clone'));
        }

        return {
            model: this.model,
            todayLunches: todayLunches
        };
    }

}
