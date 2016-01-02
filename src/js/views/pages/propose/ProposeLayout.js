import {Prototype} from 'marionette';
import {BaseLayout} from '../base/BaseLayout';
import template from './tpl/ProposeLayout.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template
})
export class ProposeLayout extends BaseLayout {

    serializeData() {
        return {
            model: this.model,
            savedLunches: this.model.getSavedLunches(),
            mergedLunches: this.model.getMergedLunches()
        };
    }

}
