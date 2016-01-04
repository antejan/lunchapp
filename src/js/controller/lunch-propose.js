import {app} from '../app';
import {router} from '../router';
import {error} from '../error';
import {resources} from '../resources';

router.on('route:propose', () => {
    let timeSource = resources.timeSource();
    let stage = timeSource.getStage();

    if (stage !== 'propose') {
        router.navigate('/', {trigger: true});
        return;
    }

    require(['../views/pages/propose/ProposeLayout'], function ({ProposeLayout}) {

        resources.lunchState()
            .then((state) => {
                return state.prepareToPropose()
                    .then(() => {
                        app.content.show(new ProposeLayout({
                            model: state
                        }));
                    });
            });
    });

});