import {Behavior} from 'marionette';

/**
 * @class ToogleComparatorBehavior
 */
export class ToogleComparatorBehavior extends Behavior {

    defaults() {
        return {
            defaultField: 'name',
            defaultDirection: 1
        };
    }

    initialize() {
        this.comparatorField = this.options.defaultField;
        this.comparatorDirection = this.options.defaultDirection;
        this.syncOptions();
        this.listenTo(this.view, 'view:sort', this.toggleViewComparator);
    }

    syncOptions() {
        this.view.comparatorField = this.comparatorField;
        this.view.comparatorDirection = this.comparatorDirection;
        this.view.viewComparator = this.getComparator();
    }

    /**
     * Toggle sort field and order
     * @param {string} comparatorField
     */
    toggleViewComparator(comparatorField) {
        if (this.comparatorField === comparatorField) {
            this.comparatorDirection = -this.comparatorDirection;
        } else {
            this.comparatorField = comparatorField;
            this.comparatorDirection = 1;
        }

        this.syncOptions();
        this.view.render();
    }

    getComparator() {
        return (file1, file2) => {
            if (file1.get(this.comparatorField) > file2.get(this.comparatorField)) {
                return this.comparatorDirection;
            } else if (file1.get(this.comparatorField) < file2.get(this.comparatorField)) {
                return -this.comparatorDirection;
            }
            return 0;
        };
    }
}