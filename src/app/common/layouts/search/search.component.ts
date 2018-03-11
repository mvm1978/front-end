import {Component, Input} from '@angular/core';

import {Constants} from '../../../common/core/constants';

declare let jQuery: any;

@Component({
    selector: 'search',
    templateUrl: Constants.SEARCH_PATH + 'search.component.html',
    styleUrls: [
        Constants.SEARCH_PATH + 'search.component.css'
    ]
})

export class SearchComponent
{
    @Input() component: any;
    private searchDelay: number = 0;

    constructor ()
    {
    }

    //**************************************************************************

    public onSearch($event: any): boolean
    {
        if ($event.keyCode == 27) {
            // empty search input on Esc
            jQuery('#search-input').val('');
        }

        this.searchDelay++;

        let component = this.component;
        let that = this;

        setTimeout(function() {
            // search execution will fire in 1 second upon the last key was pressed
            that.searchDelay--;

            if (that.searchDelay <= 0) {

                let value = jQuery('#search-input').val();

                if (component.hasOwnProperty('filter')) {
                    component.filter['search'] = value;
                } else if (component.hasOwnProperty('_agGridServices')) {
                    component._agGridServices.output['search'] = value;
                    component._agGridServices.output['page'] = 1;
                }

                that.searchDelay = 0;

                component.reload();
            }
        }, 1000);

        return true;
    }

    //**************************************************************************

}
