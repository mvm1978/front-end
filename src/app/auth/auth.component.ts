import {Component} from '@angular/core';

import {ModalPopupComponent} from '../common/layouts/modal-popup/modal-popup.component';
import {SharedServices} from '../common/services/shared.services';
import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

declare let jQuery: any;

@Component({
    selector: 'auth',
    host: {
        '(document:click)': 'handleClick($event)',
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
    private initPopup: boolean = false;

    //**************************************************************************

    constructor (
        private _sharedServices: SharedServices,
        private _globalEventsManager: GlobalEventsManager
    )
    {
        super();
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._globalEventsManager.authPopupEmitter
            .subscribe((authPopup) => {

                this.initPopup = true;

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

    public handleClick($event: any): void
    {
        if (! $event.x && ! $event.y) {
            return;
        }

        if (this.initPopup) {
            this.initPopup = false;
        } else {

            let $content = jQuery('#auth-popup-content');

            if (this._sharedServices.checkIfOuterClick($event.x, $event.y, $content)) {
                this.authPopup = '';
            }
        }
    }

    //**************************************************************************

    public submitPopup():void {
        // a new popup was displayed
        this.initPopup = true;
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
