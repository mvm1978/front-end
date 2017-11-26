import {Component} from '@angular/core';

import {ModalPopupComponent} from '../common/layouts/modal-popup/modal-popup.component';
import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

@Component({
    selector: 'auth',
    host: {
//        '(document:click)': 'handleClick($event)',
    },
    templateUrl: Constants.AUTH_PATH + 'auth.component.html',
    styleUrls: [
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class AuthComponent extends ModalPopupComponent
{
    protected selector: string = 'auth';

    public authPopup: string = '';
    public isSignOut: boolean = false;

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
    )
    {
        super();
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._globalEventsManager.authPopupEmitter
            .subscribe((authPopup) => {
                this.authPopup = authPopup;
            }
        );

        this._globalEventsManager.signOutEmitter
            .subscribe((isSignOut) => {
                this.isSignOut = isSignOut;
            }
        );
    }

    //**************************************************************************

    public onClose()
    {
        // hide signing popups
        this.authPopup = '';

        return false;
    }

    //**************************************************************************
}
