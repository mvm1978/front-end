import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';
import {RowInputGroupServices} from '../row-input-group.services';

declare var jQuery: any;

@Component({
    selector: 'inline-uploader-row-input-group',
    templateUrl: Constants.ROW_INPUT_GROUP_PATH + 'inline-uploader/inline-uploader-row-input-group.component.html',
    styleUrls: [
        Constants.ROW_INPUT_GROUP_PATH + 'row-input-group.css',
        Constants.ROW_INPUT_GROUP_PATH + 'inline-uploader/inline-uploader-row-input-group.component.css'
    ],
})

export class InlineUploaderRowInputGroupComponent
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

        jQuery('#' + this.data.id + '-selected').val(label);
    }

    //**************************************************************************

}
