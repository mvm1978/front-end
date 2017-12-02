import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';
import {RecoveryQuestionsComponent} from '../layouts/recovery-questions/recovery-questions.component';

declare let jQuery: any;

@Component({
    selector: 'sign-up',
    providers: [
        AuthServices,
        CredentialsRowComponent,
        RecoveryQuestionsComponent
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
    @ViewChild(RecoveryQuestionsComponent) recoveryQuestions: RecoveryQuestionsComponent;

    public isRecoveryQuestions: boolean = false;

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
            name: 'fname',
        },
        {
            caption: 'Last Name',
            id: 'last-name',
            name: 'lname',
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
            placeholder: 'confirm password',
            validate: 'confirm',
            target: 'password'
        }
    ];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public backToSignUp()
    {
        this.isRecoveryQuestions = false;
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

        if (! data.email && ! this.isRecoveryQuestions) {
            // show page with password recovery questions if no email was input
            this.isRecoveryQuestions = true;

            return false;
        }

        data.questions = {};

        if (this.isRecoveryQuestions) {

            let results = this._authServices.checkRecoveryQuestions();

            if (results.duplicate.length || results.noAnswer.length) {
                return false;
            } else {
                data.questions = results.questions;
            }
        }

        data.first_name = data['first-name'];
        data.last_name = data['last-name'];

        delete data['first-name'];
        delete data['last-name'];

        this._globalEventsManager.showLoadingOverload(true);

        this._authServices.signUp(data)
            .subscribe(
                response => {
                    this._globalEventsManager.authPopup('Sign In');
                },
                err => {
                    let message = this._authServices.showError(err,
                            'Error signing up');

                    let firstPageErrors = [
                        'username_exists',
                        'email_exists',
                        'Error signing up'
                    ];

                    if (! ~jQuery.inArray(message, firstPageErrors)) {
                        this.isRecoveryQuestions = false;
                    }

                    this._globalEventsManager.showLoadingOverload(false);
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );

        return false;
    }

    //**************************************************************************

}