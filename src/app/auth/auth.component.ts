import {Component} from '@angular/core';

import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

@Component({
    selector: 'auth',
    templateUrl: Constants.AUTH_PATH + 'auth.component.html',
    styleUrls: [
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class AuthComponent
{
    public isSignOut: boolean = false;

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.signOutEmitter
            .subscribe((isSignOut) => {
                this.isSignOut = isSignOut;
            }
        );
    }

    //**************************************************************************

}
