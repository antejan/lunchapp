import {Prototype, LocalStorage} from 'backbone';
import {AbstractLunches} from './AbstractLunches';
import {SavedLunchesMock} from './SavedLunches.mock';

@Prototype({
    url: '/api/lunch/saved',
    localStorage: new LocalStorage('SavedLunches')
})
export class SavedLunches extends AbstractLunches {

    /**
     * @param {object} options
     * @returns {Promise.<SavedLunches>}
     */
    static factory(options) {
        let lunches = new this(options);
        return lunches.fetch().then(() => {
            // init with mock data if empty
            if (!lunches.size()) {
                lunches.initMock(SavedLunchesMock);
            }
            return lunches;
        });
    }

}