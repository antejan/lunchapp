import {Prototype, LayoutView} from 'marionette';
import template from './tpl/ChooseListItem.hbs';

/**
 * @property {Lunch} model
 * @property {LunchState} state
 */
@Prototype({
    template,
    className: 'list-item',
    ui: {
        'radio': 'input[type=radio]'
    },
    events: {
        'change @ui.radio': 'onChangeRadio'
    }
})
export class ChooseListItem extends LayoutView {

    onChangeRadio(event) {
        this.value = $(event.target).val();
        this.model.setUserPoints(this.value, this.options.state.getUser());
        this.refresh();
    }

    onRender() {
        this.value = this.model.getUserPoints(this.options.state.getUser());
        this.ui.radio.filter(`[value=${this.value}]`).prop('checked', true);
        this.refresh();
    }

    refresh() {
        this.$el.toggleClass('list-item-selected', this.value > 0);
        this.$el.toggleClass('list-item-negative', this.value < 0);
    }

}
