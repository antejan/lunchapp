import {Prototype, LayoutView} from 'marionette';
import template from './tpl/ProposeListItem.hbs';

/**
 * @property {Lunch} model
 * @property {LunchState} state
 */
@Prototype({
    template,
    className: 'list-item',
    ui: {
        'chk': 'input[type=checkbox]'
    },
    events: {
        'change @ui.chk': 'onChangeCheckbox'
    }
})
export class ProposeListItem extends LayoutView {

    initialize() {
        this.modelClone = this.findInTodayLunches() || this.model.clone();
    }

    /**
     * @returns {Lunch|undefined}
     */
    findInTodayLunches() {
        return this.options.state.getTodayLunches().find(this.model.toJSON());
    }

    templateHelpers() {
        return {
            checked: Boolean(this.findInTodayLunches())
        };
    }

    onChangeCheckbox() {
        var chkState = this.ui.chk.prop('checked');
        this.options.state.toggleProposeToday(this.modelClone, chkState);
    }

}
