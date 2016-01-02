import {Prototype, LayoutView} from 'marionette';
import template from './tpl/ProposeTitle.hbs';

/**
 * @property {LunchState} model
 */
@Prototype({
    template,
    className: 'list-title'
})
export class ProposeTitle extends LayoutView {

    templateHelpers() {
        return {
            user: this.model.getUser()
        };
    }

}
