import {Prototype} from 'marionette';
import {BaseLayout} from '../base/BaseLayout';
import template from './tpl/ProposeLayout.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template,
    className: 'wrapper wrapper-propose'
})
export class ProposeLayout extends BaseLayout {

    onShow() {
        setTimeout(() => {
            this.$el.removeClass('wrapper-propose');
        }, 3000);
    }

    serializeData() {
        return {
            model: this.model,
            savedLunches: this.model.getSavedLunches(),
            mergedLunches: this.model.getMergedLunches()
        };
    }

}
