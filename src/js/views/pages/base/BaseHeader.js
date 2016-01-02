import {LayoutView, Prototype} from 'marionette';
import template from './tpl/BaseHeader.hbs';
/**
 * @property {State} model
 */
@Prototype({
    template
})
export class BaseHeader extends LayoutView {

    templateHelpers() {
        return {
            date: this.model.getTimeSource().getTime()
        };
    }

}
