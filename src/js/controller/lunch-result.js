import {app} from '../app';
import {router} from '../router';
import {error} from '../error';
import {resources} from '../resources';
import {Result} from '../views/pages/result/Result';
import {NoResult} from '../views/pages/result/NoResult';

router.on('route:result', () => {
    let timeSource = resources.timeSource();
    let stage = timeSource.getStage();

    if (stage !== 'result') {
        router.navigate('/', {trigger: true});
        return;
    }

    resources.lunchState()
        .then((state) => {
            let todayChooses = state.getLunchesWithMaxPoints();

            return app.content.show(new (todayChooses.length ? Result : NoResult)({
                model: state,
                todayChooses
            }));
        });

});