import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {SharedServices} from '../../common/services/shared.services';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

declare let jQuery: any;

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

    public isPasswordRecovery: boolean = false;

    public submitCaption: string = 'Password Recovery';
    public recoverByEmail: boolean = true;
    public recoverByQuestion: boolean = false;
    private recoveryQuestionID: number = 0;
    private username: string = '';

    public byEmailRows: any = [
        {
            caption: 'Email',
            mandatory: true,
            id: 'email',
            'type': 'email',
            placeholder: 'Email'
        }
    ];

    public byUsernameRows: any = [
        {
            caption: 'User Name',
            mandatory: true,
            id: 'username',
            validate: 'username'
        }
    ];

    public passwordResetRows: any = [
        {
            caption: '',
            mandatory: true,
            id: 'recovery-answer',
            'footer-nickname': 'Answer for the question',
            placeholder: 'Answer the question'
        },
        {
            caption: 'New Password',
            mandatory: true,
            id: 'new-password',
            'type': 'password',
            validate: 'password',
            placeholder: 'New password'
        },
        {
            caption: 'Confirm Password',
            mandatory: true,
            id: 'confirm-password',
            'type': 'password',
            placeholder: 'Confirm password',
            validate: 'confirm',
            target: 'new-password'
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

    public onSubmit()
    {
        jQuery('#password-recovery-footer').html('');

        let results: any = {};

        if (this.credentialRows) {

            results = this.credentialRows.verify();

            if (! results.isValid) {
                return false;
            }
        }

        this._globalEventsManager.showLoadingOverload(true);

        if (this.recoverByEmail) {

            let email = results.data['email'];

            this._authServices.passwordRecoveryEmail(email)
                .subscribe(
                    response => {

                        this._globalEventsManager.authPopup('Sign In');

                        this._globalEventsManager.messageBox({
                            text: 'A recovery link was sent to the provided email address. ' +
                                  'Check your email box and follow the instructions.'
                        });
                    },
                    err => {
                        this._authServices.showError(err,
                                'Error recoveryting password');
                        this._globalEventsManager.showLoadingOverload(false);
                    },
                    () => {
                        this._globalEventsManager.showLoadingOverload(false);
                    }
                );
        } else if (this.recoverByQuestion) {
            if (this.submitCaption == 'Get Question') {

                this.username = jQuery('#username').val();

                jQuery('#sign-footer').html('');

                this._authServices.getRecoveryQuestion(this.username)
                    .subscribe(
                        response => {
                            this.recoveryQuestionID = response.question_id;
                            this.passwordResetRows[0].caption = response.question;
                            // hiding username input and displaying recovery question
                            this.submitCaption = 'Reset Password';
                        },
                        err => {
                            this._authServices.showError(err,
                                    'No recovery questions found for the username');
                            this._globalEventsManager.showLoadingOverload(false);
                        },
                        () => {
                            this._globalEventsManager.showLoadingOverload(false);
                        }
                    );
            } else {

                let answer = jQuery('#recovery-answer').val();

                if (! answer) {

                    this._sharedServices.showRowError('recovery-answer-footer',
                            'Answer the question');

                    this._globalEventsManager.showLoadingOverload(false);

                    return false;
                }

                let params = {
                    questionID: this.recoveryQuestionID,
                    answer: answer,
                    password: jQuery('#new-password').val()
                };

                this._authServices.verifyRecoveryQuestion(this.username, params)
                    .subscribe(
                        response => {

                            this._globalEventsManager.messageBox({
                                text: response.message + '. Please sign in.'
                            });

                            this._globalEventsManager.authPopup('Sign In');
                        },
                        err => {
                            this._authServices.showError(err,
                                    'Invalid answer for the recovery question');
                            this._globalEventsManager.showLoadingOverload(false);
                        },
                        () => {
                            this._globalEventsManager.showLoadingOverload(false);
                        }
                    );
            }
        }

        return false;
    }

    //**************************************************************************

    public onKeyPress(id: string)
    {
        this._sharedServices.clearRowErrors(id);
    }

    //**************************************************************************

    public onTabClick(recoveryMode: string)
    {
        jQuery('.recovery-tab').removeClass('active');
        jQuery('#' + recoveryMode).parent().addClass('active');

        this.recoverByEmail = recoveryMode == 'by-email';
        this.recoverByQuestion = recoveryMode == 'by-question';

        this.submitCaption = recoveryMode == 'by-email' ? 'Recovery Password' :
                'Get Question';

        return false;
    }

    //**************************************************************************

}