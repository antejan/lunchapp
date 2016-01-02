import {Prototype,CompositeView} from 'marionette';
import {ProposeListItem} from './ProposeListItem';
import template from './tpl/ProposeList.hbs';

/**
 * @property {TodayLunches} collection
 * @property {LunchState} lunchesState
 */
@Prototype({
    template,
    className: 'list-items',
    childView: ProposeListItem
})
export class ProposeLists extends CompositeView {

    childViewOptions() {
        return {
            state: this.options.state
        };
    }

}
