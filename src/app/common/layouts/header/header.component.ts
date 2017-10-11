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
            }
        );

        this._globalEventsManager.updateUserWelcomeEmitter
            .subscribe(() => {
                this.updateUserWelcome();
            }
        );
    }

    //**************************************************************************

    public onSignUp()
    {
        this.hideAllWindows();

        this._globalEventsManager.signUp(true);
    }

    //**************************************************************************

    public onSignIn()
    {
        this.hideAllWindows();

        this._globalEventsManager.signIn(true);
    }

    //**************************************************************************

    public onPasswordReset()
    {
        this.hideAllWindows();

        this._globalEventsManager.passwordReset(true);
    }

    //**************************************************************************

    public onUserInfoUpdate()
    {
        this.hideAllWindows();

        this._globalEventsManager.userInfo(true);
    }

    //**************************************************************************

    private hideAllWindows()
    {
        this._globalEventsManager.signUp(false);
        this._globalEventsManager.signIn(false);
        this._globalEventsManager.passwordReset(false);
        this._globalEventsManager.userInfo(false);
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
        this.isSignedIn = this._authServices.getUserInfoValue('token') != undefined;

        if (this.isSignedIn) {
            this.userWelcomeName = this._authServices.getUserInfoValue('fullName');
        }
    }

    //**************************************************************************

}
