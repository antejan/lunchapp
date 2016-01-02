import {app} from '../app';
import {router} from '../router';
import {resources} from '../resources';

router.on('route:lunch', () => {
    let timeSource = resources.timeSource();
    let stage = timeSource.getStage();

    router.navigate(`/${stage}`, {trigger: true, replace: true});

});