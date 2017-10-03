import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedService} from '../../common/modules/shared.service';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare var jQuery: any;

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
        protected _globalEventsManager: GlobalEventsManager,
        private _sharedService: SharedService,
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

                    localStorage.setItem('userToken', response.token);
                    localStorage.setItem('userID', response.id);

                    this._globalEventsManager.signedIn(true);

                    let app = this._sharedService.get('app');

                    window.open('/#/' + app, '_self');
                },
                err => {
                    this._authServices.showSigningError(err, 'Error signing to the account');
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );

        return false;
    }

    //**************************************************************************

    public onClose()
    {
        this._globalEventsManager.signIn(false);

        return false;
    }

    //**************************************************************************

    public onForgotCredentials()
    {
        this._globalEventsManager.signIn(false);
        this._globalEventsManager.passwordRecovery(true);

        return false;
    }

    //**************************************************************************

}