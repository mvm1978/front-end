import {Component, Input} from '@angular/core';

import {Constants} from '../../../core/constants';
import {SharedServices} from '../../../services/shared.services';

declare var jQuery: any;

@Component({
    selector: 'inline-input-row-input-group',
    templateUrl: Constants.LAYOUTS_PATH + 'row-input-group/inline-input/inline-input-row-input-group.component.html',
    styleUrls: [
        Constants.LAYOUTS_PATH + 'row-input-group/inline-input/inline-input-row-input-group.component.css'
    ],
})

export class InlineInputRowInputGroupComponent
{
    @Input() data: any;

    //**************************************************************************

    constructor (
        private _sharedServices: SharedServices
    )
    {

    }

    //**************************************************************************

    public onKeyPress()
    {
        this._sharedServices.clearRowErrors(this.data.id);
    }

    //**************************************************************************

}