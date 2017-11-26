import {Component} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {GlobalEventsManager} from '../common/modules/global-events-manager';
import {Constants} from '../common/core/constants';

@Component({
    selector: 'home',
    templateUrl: Constants.HOME_PATH + 'home.component.html',
    styleUrls: [
        Constants.HOME_PATH + 'home.component.css'
    ],
})

export class HomeComponent
{

    //**************************************************************************

    constructor (
        private activatedRoute: ActivatedRoute,
        private _globalEventsManager: GlobalEventsManager
    )
    {

    }

    //**************************************************************************

    private ngOnInit(): void
    {
        localStorage.removeItem('password-recovery-token');

        this.activatedRoute.queryParams
            .subscribe(response => {
                if (response.hasOwnProperty('password-recovery-token')) {
                    // password reset by email was requested
                    localStorage.setItem('password-recovery-token',
                            response['password-recovery-token']);
                    // redirect to password reset page
                    this._globalEventsManager.authPopup('Password Reset');
                    this._globalEventsManager.signOut();
                }
            });
    }

    //**************************************************************************

}
