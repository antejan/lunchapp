import {Prototype, LayoutView} from 'marionette';
import template from './tpl/SuccessSave.hbs';
import {router} from '../../../router';

/**
 * @param {lunchState} model
 * @param {string} waitForStage
 */
@Prototype({
    template,
    className: 'wrapper'
})
export class SuccessSave extends LayoutView {

    initialize() {
        this.listenTo(this.model.getTimeSource(), 'tick', this.onTick);
    }

    onTick() {
        if (this.model.getTimeSource().getStage() == this.options.waitForStage) {
            router.navigate('/', {trigger: true});
        }
    }

}
