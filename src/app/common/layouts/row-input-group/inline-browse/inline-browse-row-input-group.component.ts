import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';
import {RowInputGroupServices} from '../row-input-group.services';

declare var jQuery: any;

@Component({
    selector: 'inline-browse-row-input-group',
    templateUrl: Constants.LAYOUTS_PATH + 'row-input-group/inline-browse/inline-browse-row-input-group.component.html',
    styleUrls: [
        Constants.LAYOUTS_PATH + 'row-input-group/inline-browse/inline-browse-row-input-group.component.css'
    ],
})

export class InlineBrowseRowInputGroupComponent
{
    @Input() data: any;

    //**************************************************************************

    constructor (
        private _rowInputGroupServices: RowInputGroupServices
    )
    {

    }

    //**************************************************************************

    public onFileSelect()
    {
        let $input = jQuery('#' + this.data.id);

        let label = $input.val().replace(/\\/g, '/').replace(/.*\//, '');

        $input.trigger('fileselect', [1, label]);

        jQuery('#' + this.data.inputID).val(label);
    }

    //**************************************************************************

}
