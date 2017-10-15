import {Component} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedService} from '../../common/modules/shared.service';
import {mvmConstants} from '../mvm.constants';

@Component({
    selector: 'welcome',
    templateUrl: mvmConstants.WELCOME_PATH + 'welcome.component.html',
    styleUrls: [
        mvmConstants.WELCOME_PATH + 'welcome.component.css'
    ],
})

export class WelcomeComponent
{

    //**************************************************************************

    constructor (
        private activatedRoute: ActivatedRoute,
        private _globalEventsManager: GlobalEventsManager,
        private _sharedService: SharedService
    )
    {
        this._sharedService.set('app', mvmConstants.APP);
    }

    //**************************************************************************

    public ngOnInit()
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
