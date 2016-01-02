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
        _.each(mock, (fileData) => {
            let file = this.model.factoryFromData(fileData);
            this.add(file);
            file.save();
        });
    }

}