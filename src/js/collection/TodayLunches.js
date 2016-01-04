import {AbstractLunches} from './AbstractLunches';
import {Prototype, LocalStorage} from 'backbone';

@Prototype({
    url: '/api/lunch/today',
    localStorage: new LocalStorage('TodayLunches')
})
export class TodayLunches extends AbstractLunches {

    /**
     * Check if user have made some chooses
     * @param {User} user
     */
    haveUserPoints(user) {
        return this.some((lunch) => {
            return lunch.getPoints()[user.getFirstName()];
        });
    }

    static factory(options) {
        let lunches = new this(options);
        return lunches.fetch().then(() => {
            return lunches;
        });

    }

}