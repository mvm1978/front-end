import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';
import {RecoveryQuestionsComponent} from './recovery-questions/recovery-questions.component';

declare var jQuery: any;

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

            let duplicateQuestions: any = [],
                noAnswer: any = [];

            jQuery('.question-dropdown').map(function(count: number) {

                let questionID = jQuery('option:selected', this).val(),
                    answer = jQuery('#answer-' + count).val();
                // checking for duplicate question being seleted
                if (data.questions.hasOwnProperty(questionID)) {
                    duplicateQuestions.push(count);
                }

                if (answer) {
                    data.questions[questionID] = answer;
                } else {
                    noAnswer.push(count)
                }
            });

            for (let count=0;count<duplicateQuestions.length; count++) {

                let id = 'question-' + duplicateQuestions[count];

                this._authServices.showRowError(id, 'Duplicate question');
            }

            for (let count=0;count<noAnswer.length; count++) {

                let id = 'question-' + noAnswer[count];

                this._authServices.showRowError(id, 'Answer for the question is mandatory');
            }

            if (duplicateQuestions.length || noAnswer.length) {
                return false;
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
                    this._globalEventsManager.signUp(false);
                    this._globalEventsManager.signIn(true);
                },
                err => {
                    let message = this._authServices.showSigningError(err,
                            'Error signing up');

                    let firstPageErrors = [
                        'username_exists',
                        'email_exists',
                        'Error signing up'
                    ];

                    if (! ~jQuery.inArray(message, firstPageErrors)) {
                        this.isRecoveryQuestions = false;
                    }
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