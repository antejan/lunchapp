import {Prototype,CompositeView} from 'marionette';
import {ChooseListItem} from './ChooseListItem';
import template from './tpl/ChooseList.hbs';

/**
 * @property {TodayLunches} collection
 * @property {LunchState} lunchesState
 */
@Prototype({
    template,
    childViewContainer: '.list-items',
    childView: ChooseListItem
})
export class ChooseLists extends CompositeView {

    childViewOptions() {
        return {
            state: this.options.state
        };
    }

}
