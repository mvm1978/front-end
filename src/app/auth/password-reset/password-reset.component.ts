import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare let jQuery: any;

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
        private _globalEventsManager: GlobalEventsManager,
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

                    this._globalEventsManager.messageBox({
                        text: response.message
                    });

                    this._globalEventsManager.authPopup('Sign In');
                    this._globalEventsManager.showLoadingOverload(false);
                },
                err => {

                    this._authServices.showError({
                        err: err,
                        defaultMessage: 'Error resetting password',
                        output: 'sign'
                    });

                    this._globalEventsManager.showLoadingOverload(false);
                },
                () => {}
            );

        return false;
    }

    //**************************************************************************

}