import {router} from '../router';

router.on('route:404', () => {
    router.navigate('/', {trigger: true});
});