import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';
import {RowInputGroupServices} from '../row-input-group.services';

declare var jQuery: any;

@Component({
    selector: 'inline-dropdown-row-input-group',
    templateUrl: Constants.ROW_INPUT_GROUP_PATH + 'inline-dropdown/inline-dropdown-row-input-group.component.html',
    styleUrls: [
        Constants.ROW_INPUT_GROUP_PATH + 'row-input-group.css',
        Constants.ROW_INPUT_GROUP_PATH + 'inline-dropdown/inline-dropdown-row-input-group.component.css'
    ],
})

export class InlineDropdownRowInputGroupComponent
{
    @Input() data: any;

    //**************************************************************************

    constructor (
        private _rowInputGroupServices: RowInputGroupServices
    )
    {

    }

    //**************************************************************************

}
