import {AbstractLunches} from './AbstractLunches';
import {Prototype, LocalStorage} from 'backbone';
import {max} from 'lodash';

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

    /**
     * Calc today's choose
     */
    getLunchesWithMaxPoints() {
        let maxPoints = max(this.pluck('totalPoints'));
        return this.filter({totalPoints: maxPoints});
    }

    static factory(options) {
        let lunches = new this(options);
        return lunches.fetch().then(() => {
            return lunches;
        });

    }

}