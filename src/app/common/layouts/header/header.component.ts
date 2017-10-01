import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';

@Component({
    selector: 'header',
    templateUrl: './app/common/layouts/header/header.component.html',
    styleUrls: [
        './app/common/layouts/header/header.component.css'
    ]
})

export class HeaderComponent
{
    isSignedIn: boolean = false;

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager
    )
    {
        this._globalEventsManager.signedInEmitter
            .subscribe((isSignedIn) => {
                this.isSignedIn = isSignedIn;
            }
        );
    }

    //**************************************************************************

    public ngOnInit()
    {
        this.isSignedIn = !! localStorage.getItem('userToken');
console.log(this.isSignedIn);
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
        localStorage.setItem('userToken', '');
        localStorage.setItem('userID', '');

        this.isSignedIn = false;
    }

    //**************************************************************************

}
