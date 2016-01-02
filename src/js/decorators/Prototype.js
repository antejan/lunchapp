import {extend} from 'lodash';

export function Prototype(prototype) {
    return function (TargetComponent) {
        extend(TargetComponent.prototype, prototype);
    };
}