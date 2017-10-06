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

    public isSignIn: boolean = false;

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
        private _sharedService: SharedService,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.signInEmitter
            .subscribe((isSignIn) => {
                this.isSignIn = isSignIn;
            }
        );
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

                    localStorage.setItem('userInfo', JSON.stringify(response));

                    this._globalEventsManager.signedIn(true);

                    this._globalEventsManager.signIn(false);

                    let app = this._sharedService.get('app');

                    window.open('/#/' + app, '_self');
                },
                err => {
                    this._authServices.showSigningError(err, 'Error signing to the account');
                    this._globalEventsManager.showLoadingOverload(false);
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