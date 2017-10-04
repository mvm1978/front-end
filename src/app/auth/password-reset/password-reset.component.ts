import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare var jQuery: any;

@Component({
    selector: 'password-reset',
    providers: [
        AuthServices
    ],
    templateUrl: Constants.PASSWORD_RESET_PATH + 'password-reset.component.html',
    styleUrls: [
        Constants.PASSWORD_RESET_PATH + 'password-reset.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class PasswordResetComponent
{
    @ViewChild(CredentialsRowComponent) credentialRows: CredentialsRowComponent;

    public rows: any = [
        {
            caption: 'Old Password',
            mandatory: true,
            id: 'old-password',
            'type': 'password',
            placeholder: 'old password'
        },
        {
            caption: 'New Password',
            mandatory: true,
            id: 'new-password',
            'type': 'password',
            validate: 'password',
            placeholder: 'new password'
        },
        {
            caption: 'Confirm Password',
            mandatory: true,
            id: 'confirm-password',
            'type': 'password',
            placeholder: 'confirm password',
            validate: 'confirm',
            target: 'new-password'
        }
    ];

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {
        if (localStorage.hasOwnProperty('password-recovery-token')) {
            // no need in "Old Password" when resettign passwords by token
            this.rows.shift();
        }
    }

    //**************************************************************************

    public onPasswordChange()
    {
        jQuery('#password-reset-footer').html('');

        let results: any = this.credentialRows.verify();

        if (! results.isValid) {
            return false;
        }

        let params: any = {
            newPassword: results.data['new-password']
        };

        if (results.data.hasOwnProperty('old-password')) {
            params['oldPassword'] = results.data['old-password'];
        }

        this._globalEventsManager.showLoadingOverload(true);

        this._authServices.passwordReset(params)
            .subscribe(
                response => {
                    this._globalEventsManager.passwordReset(false);
                    this._globalEventsManager.signIn(true);

                    this._globalEventsManager.showLoadingOverload(false);
                },
                err => {
                    this._authServices.showSigningError(err, 'Error resetting password');
                },
                () => {}
            );

        return false;
    }

    //**************************************************************************

    public onClose()
    {
        this._globalEventsManager.passwordReset(false);

        return false;
    }

    //**************************************************************************

}