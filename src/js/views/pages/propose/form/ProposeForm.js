import {Prototype, LayoutView} from 'marionette';
import {Lunch} from '../../../../model/Lunch';
import template from './tpl/ProposeForm.hbs';

/**
 * @property {Lunch} collection
 * @property {LunchState} state
 */
@Prototype({
    template,
    className: 'list-item',
    ui: {
        'btnShowForm': '.ui-btn-show-form',
        'form': '.form',
        'formCook': '.ui-form-cook',
        'formRestaurant': '.ui-form-restaurant',
        'type': 'input[name=proposal_type]',
        'chkSave': '.ui-chk-save',
        'chkSaveInput': '.ui-chk-save input',
        'inputs': 'input[type=text][name]',
        'btnCancel': '.ui-btn-cancel',
        'btnSave': '.ui-btn-save'
    },
    events: {
        'click @ui.btnShowForm': 'showForm',
        'click @ui.btnCancel': 'render',
        'click @ui.btnSave': 'onSaveClick',
        'change @ui.type': 'onChangeType',
        'input @ui.inputs': 'onInput'
    }
})
export class ProposeForm extends LayoutView {

    initialize() {
        this.model = Lunch.factoryFromData({
            proposer: this.options.state.getUser().getFirstName()
        });
    }

    showForm() {
        this.ui.btnShowForm.addClass('hidden');
        this.ui.form.removeClass('hidden');
    }

    onChangeType(event) {
        let type = $(event.target).val();
        this.ui.formCook.toggleClass('hidden', type !== 'cook');
        this.ui.formRestaurant.toggleClass('hidden', type !== 'restaurant');
        this.ui.chkSave.toggleClass('hidden', type !== 'restaurant');
    }

    onInput(event) {
        let name = event.target.name;
        let value = $(event.target).val();
        this.model.set(name, value);
    }

    onSaveClick() {
        let type = this.ui.type.filter(':checked').val();
        let save = type === 'restaurant' && this.ui.chkSaveInput.prop('checked');

        // simple validation
        if (!this.model.get('name') && !this.model.get('meal')) {
            this.$('input[name=' + (type === 'cook' ? 'meal' : 'name') + ']').focus();
        } else {
            this.options.state.proposeLunch(this.model, save);

            // clearing and closing form
            this.model = Lunch.factoryFromData({
                proposer: this.options.state.getUser().getFirstName()
            });
            this.render();
        }

    }

}
