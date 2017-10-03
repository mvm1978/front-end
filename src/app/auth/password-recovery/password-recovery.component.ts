import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedService} from '../../common/modules/shared.service';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare var jQuery: any;

@Component({
    selector: 'password-recovery',
    providers: [
        AuthServices
    ],
    templateUrl: Constants.PASSWORD_RECOVERY_PATH + 'password-recovery.component.html',
    styleUrls: [
        Constants.PASSWORD_RECOVERY_PATH + 'password-recovery.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class PasswordRecoveryComponent
{
    @ViewChild(CredentialsRowComponent) credentialRows: CredentialsRowComponent;

    public rows: any = [
        {
            caption: 'Email',
            mandatory: true,
            id: 'email',
            'type': 'email',
            placeholder: 'Email'
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

    public onPasswordChange()
    {
        jQuery('#password-recovery-footer').html('');

        let results: any = this.credentialRows.verify();

        if (! results.isValid) {
            return false;
        }

        let email = results.data['email'];

        this._globalEventsManager.showLoadingOverload(true);

        this._authServices.passwordRecoveryEmail(email)
            .subscribe(
                response => {
                    this._globalEventsManager.passwordRecovery(false);
                    this._globalEventsManager.signIn(true);
                },
                err => {
                    this._authServices.showSigningError(err, 'Error recoveryting password');
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
        this._globalEventsManager.passwordRecovery(false);

        return false;
    }

    //**************************************************************************

}