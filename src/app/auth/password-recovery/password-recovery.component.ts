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

    public submitCaption: string = 'Password Recovery';

    public recoverByEmail: boolean = true;
    public recoverByQuestion: boolean = false;

    public recoveryQuestionID: number = 0;

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
            placeholder: 'Confirnm password',
            validate: 'confirm',
            target: 'new-password'
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
                        this._globalEventsManager.passwordRecovery(false);
                        this._globalEventsManager.signIn(true);
                    },
                    err => {
                        this._authServices.showSigningError(err,
                                'Error recoveryting password');
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
                            this._authServices.showSigningError(err,
                                    'No recovery questions found for the username');
                        },
                        () => {
                            this._globalEventsManager.showLoadingOverload(false);
                        }
                    );
            } else {

                let answer = jQuery('#recovery-answer').val();

                if (! answer) {

                    this._authServices.showRowError('recovery-answer-footer',
                            'Answer the question');

                    this._globalEventsManager.showLoadingOverload(false);

                    return false;
                }

                let params = {
                    username: this.username,
                    questionID: this.recoveryQuestionID,
                    answer: answer,
                    password: jQuery('#new-password').val()
                };

                this._authServices.verifyRecoveryQuestion(params)
                    .subscribe(
                        response => {
                            this._globalEventsManager.passwordRecovery(false);
                            this._globalEventsManager.signIn(true);

                            this._globalEventsManager.showLoadingOverload(false);
                        },
                        err => {
                            this._authServices.showSigningError(err,
                                    'Invalid answer for the recovery question');
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
        jQuery('#' + id + '-group').removeClass('has-error');
        jQuery('#' + id + '-footer').html('');
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

    public onClose()
    {
        this._globalEventsManager.passwordRecovery(false);

        return false;
    }

    //**************************************************************************

}