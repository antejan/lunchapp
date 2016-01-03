import {Collection, Prototype} from 'backbone';
import {Lunch} from '../model/Lunch';

@Prototype({
    model: Lunch
})
export class AbstractLunches extends Collection {

    /**
     * @param {object[]} mock
     */
    initMock(mock) {
        _.each(mock, (lunchData) => {
            let lunch = this.model.factoryFromData(lunchData);
            this.add(lunch);
            lunch.save();
        });
    }

}