import {Prototype, LayoutView} from 'marionette';
import template from './tpl/ChooseTitle.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template,
    className: 'list-title'
})
export class ChooseTitle extends LayoutView {

    templateHelpers() {
        return {
            user: this.model.getUser()
        };
    }

}
