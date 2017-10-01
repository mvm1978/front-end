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
    public isSignIn: boolean = false;
    public isSignUp: boolean = false;
    public isSignOut: boolean = false;
    public isPasswordReset: boolean = false;
    public isPasswordRecovery: boolean = false;

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
    )
    {
        this._globalEventsManager.signUpEmitter
            .subscribe((isSignUp) => {
                this.isSignUp = isSignUp;
            }
        );

        this._globalEventsManager.signInEmitter
            .subscribe((isSignIn) => {
                this.isSignIn = isSignIn;
            }
        );

        this._globalEventsManager.signOutEmitter
            .subscribe((isSignOut) => {
                this.isSignOut = isSignOut;
            }
        );

        this._globalEventsManager.passwordResetEmitter
            .subscribe((isPasswordReset) => {
                this.isPasswordReset = isPasswordReset;
            }
        );

        this._globalEventsManager.passwordRecoveryEmitter
            .subscribe((isPasswordRecovery) => {
                this.isPasswordRecovery = isPasswordRecovery;
            }
        );
    }

    //**************************************************************************

}
