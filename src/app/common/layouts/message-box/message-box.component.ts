import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

import {Constants} from '../../../common/core/constants';

@Component({
    selector: 'message-box',
    templateUrl: Constants.MESSAGE_BOX_PATH + 'message-box.component.html',
    styleUrls: [
        Constants.MESSAGE_BOX_PATH + 'message-box.component.css'
    ]
})

export class MessageBoxComponent
{
    public message: string;

    constructor (
        private _globalEventsManager: GlobalEventsManager
    )
    {
        this._globalEventsManager.messageBoxEmitter
            .subscribe((object: any) => {

                let text = object !== null && object.hasOwnProperty('text') ?
                        object.text : '';

                this.message = text;
            }
        );
    }

    //**************************************************************************

    public onClose()
    {
        this._globalEventsManager.messageBox(null);

        return false;
    }

    //**************************************************************************

}
