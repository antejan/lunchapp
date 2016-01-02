import {Model, Prototype} from 'backbone';
import {UserMock} from './User.mock';

@Prototype({
    urlRoot: '/api/user/'
})
export class User extends Model {

    /**
     * @returns {string}
     */
    getFirstName() {
        return this.get('firstName');
    }

    /**
     * @returns {User}
     */
    static factory() {
        return new this(UserMock);
    }
    
}
