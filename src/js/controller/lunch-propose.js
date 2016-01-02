import {app} from '../app';
import {router} from '../router';
import {error} from '../error';
import {resources} from '../resources';

router.on('route:propose', () => {
    let timeSource = resources.timeSource();
    let stage = timeSource.getStage();

    if (stage !== 'propose') {
        router.navigate('/', {trigger: true});
    }

    require(['../views/pages/propose/ProposeLayout'], function ({ProposeLayout}) {

        resources.lunchState()
            .then((state) => {
                state.prepareToPropose();

                app.content.show(new ProposeLayout({
                    model: state
                }));
                return true;
            });
    });

});