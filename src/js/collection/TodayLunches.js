import {AbstractLunches} from './AbstractLunches';
import {Prototype, LocalStorage} from 'backbone';

@Prototype({
    url: '/api/lunch/today',
    localStorage: new LocalStorage('TodayLunches')
})
export class TodayLunches extends AbstractLunches {

    static factory(options) {
        let lunches = new this(options);
        return lunches.fetch().then(() => {
            return lunches;
        });

    }

}