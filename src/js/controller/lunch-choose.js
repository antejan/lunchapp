import {app} from '../app';
import {router} from '../router';
import {error} from '../error';
import {resources} from '../resources';

router.on('route:choose', () => {
    let timeSource = resources.timeSource();
    let stage = timeSource.getStage();

    if (stage !== 'choose') {
        router.navigate('/', {trigger: true});
    }

    require(['../views/pages/choose/ChooseLayout'], function ({ChooseLayout}) {

        resources.lunchState()
            .then((state) => {
                return app.content.show(new ChooseLayout({
                    model: state
                }));
            });
    });

});