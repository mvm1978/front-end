import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

import {AuthServices} from '../../../auth/auth.services';

@Component({
    selector: 'header',
    providers: [
        AuthServices
    ],
    templateUrl: './app/common/layouts/header/header.component.html',
    styleUrls: [
        './app/common/layouts/header/header.component.css'
    ]
})

export class HeaderComponent
{
    public isHeader: boolean = false;
    public isSignedIn: boolean = false;
    public userWelcomeName: string = '';

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeaderEmitter
            .subscribe((isHeader) => {
                this.isHeader = isHeader;
            }
        );

        this._globalEventsManager.signedInEmitter
            .subscribe((isSignedIn) => {

                this.isSignedIn = isSignedIn;

                this.updateUserWelcome();
            }
        );
    }

    //**************************************************************************

    public onSignUp()
    {
        this._globalEventsManager.signUp(true);
        this._globalEventsManager.signIn(false);
        this._globalEventsManager.passwordReset(false);
    }

    //**************************************************************************

    public onSignIn()
    {
        this._globalEventsManager.signUp(false);
        this._globalEventsManager.signIn(true);
        this._globalEventsManager.passwordReset(false);
    }

    //**************************************************************************

    public onPasswordReset()
    {
        this._globalEventsManager.signUp(false);
        this._globalEventsManager.signIn(false);
        this._globalEventsManager.passwordReset(true);
    }

    //**************************************************************************

    public onSignOut()
    {
        this._authServices.signOut();

        this.isSignedIn = false;
    }

    //**************************************************************************

    private updateUserWelcome()
    {
        this.isSignedIn = this._authServices.getUserInfo('token') != undefined;

        if (this.isSignedIn) {
            this.userWelcomeName = this._authServices.getUserInfo('fullName');
        }
    }

    //**************************************************************************

}
