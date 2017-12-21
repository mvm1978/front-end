import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedServices} from '../../common/services/shared.services';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare let jQuery: any;

@Component({
    selector: 'sign-in',
    providers: [
        AuthServices,
        CredentialsRowComponent
    ],
    templateUrl: Constants.SIGN_IN_PATH + 'sign-in.component.html',
    styleUrls: [
        Constants.SIGN_IN_PATH + 'sign-in.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class SignInComponent
{
    @ViewChild(CredentialsRowComponent) credentialRows: CredentialsRowComponent;

    public rows: any = [
        {
            caption: 'User Name',
            mandatory: true,
            id: 'username'
        },
        {
            caption: 'Password',
            mandatory: true,
            id: 'password',
            'type': 'password',
            placeholder: 'password'
        }
    ];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _sharedServices: SharedServices,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public onSignIn()
    {
        jQuery('#sign-in-footer').html('');

        let results: any = this.credentialRows.verify();

        if (! results.isValid) {
            return false;
        }

        let username = results.data['username'],
            password = results.data['password'];

        this._globalEventsManager.showLoadingOverload(true);

        this._authServices.signIn(username, password)
            .subscribe(
                response => {

                    localStorage.removeItem('password-recovery-token');
                    localStorage.setItem('userInfo', JSON.stringify(response));

                    this._globalEventsManager.signedIn(true);

                    this._globalEventsManager.updateUserHome();

                    let app = this._sharedServices.get('app');

                    window.open('/#/' + app, '_self');
                },
                err => {

                    this._authServices.showError({
                        err: err,
                        defaultMessage: 'Error signing to the account'
                    });

                    this._globalEventsManager.showLoadingOverload(false);
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );

        return false;
    }

    //**************************************************************************

    public onForgotCredentials()
    {
        this._globalEventsManager.authPopup('Password Recovery');

        return false;
    }

    //**************************************************************************

}