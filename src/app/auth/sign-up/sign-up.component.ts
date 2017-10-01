import {Component, ViewChild} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/forkJoin';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare var jQuery: any;

@Component({
    selector: 'sign-up',
    providers: [
        AuthServices
    ],
    templateUrl: Constants.SIGN_UP_PATH + 'sign-up.component.html',
    styleUrls: [
        Constants.SIGN_UP_PATH + 'sign-up.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class SignUpComponent
{
    @ViewChild(CredentialsRowComponent) credentialRows: CredentialsRowComponent;

    public rows: any = [
        {
            caption: 'User Name',
            mandatory: true,
            id: 'username',
            validate: 'username'
        },
        {
            caption: 'Email',
            id: 'email',
            validate: 'email'
        },
        {
            caption: 'First Name',
            id: 'first-name',
        },
        {
            caption: 'Last Name',
            id: 'last-name',
        },
        {
            caption: 'Password',
            mandatory: true,
            id: 'password',
            'type': 'password',
            placeholder: 'password',
            validate: 'password'
        },
        {
            caption: 'Confirm Password',
            mandatory: true,
            id: 'confirm-password',
            'type': 'password',
            placeholder: 'confirnm password',
            validate: 'confirm',
            target: 'password'
        }
    ];

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public onSignUp()
    {
        jQuery('#sign-up-footer').html('');

        let results: any = this.credentialRows.verify();

        if (! results.isValid) {
            return false;
        }

        let data = results.data;

        data.first_name = data['first-name'];
        data.last_name = data['last-name'];

        delete data['first-name'];
        delete data['last-name'];

        this._globalEventsManager.showLoadingOverload(true);

        this._authServices.signUp(data)
            .subscribe(
                response => {
                    this._globalEventsManager.signUp(false);
                    this._globalEventsManager.signIn(true);
                },
                err => {
                    this._authServices.showSigningError(err, 'Error signing up');
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
        this._globalEventsManager.signUp(false);

        return false;
    }

    //**************************************************************************

}