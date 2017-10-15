import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {Constants} from '../../common/core/constants';
import {AuthServices} from '../../auth/auth.services';

import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';
import {RecoveryQuestionsComponent} from '../layouts/recovery-questions/recovery-questions.component';

declare var jQuery: any;

@Component({
    selector: 'user-info',
    providers: [
        AuthServices,
        CredentialsRowComponent,
        RecoveryQuestionsComponent
    ],
    templateUrl: Constants.USER_INFO_PATH + 'user-info.component.html',
    styleUrls: [
        Constants.USER_INFO_PATH + 'user-info.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class UserInfoComponent
{
    @ViewChild(CredentialsRowComponent) credentialRows: CredentialsRowComponent;
    @ViewChild(RecoveryQuestionsComponent) recoveryQuestions: RecoveryQuestionsComponent;

    public isUserInfo: boolean = false;

    public updateMode: string;
    public isUserInfoTab: boolean = true;
    public isRecoveryQuestionsTab: boolean = false;

    public rows: any = [
        {
            caption: 'Email',
            id: 'email',
            validate: 'email',
            storageValue: 'email'
        },
        {
            caption: 'First Name',
            id: 'first-name',
            name: 'fname',
            storageValue: 'firstName'
        },
        {
            caption: 'Last Name',
            id: 'last-name',
            name: 'lname',
            storageValue: 'lastName'
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

    public ngOnInit()
    {
        this.updateUserInfoRows();
    }

    //**************************************************************************

    private updateUserInfoRows()
    {
        for (let count=0; count<this.rows.length; count++) {

            let key = this.rows[count].storageValue;

            this.rows[count].value = this._authServices.getUserInfoValue(key);
        }
    }

    //**************************************************************************

    public onTabClick(updateMode: string)
    {
        jQuery('.recovery-tab').removeClass('active');
        jQuery('#' + updateMode).parent().addClass('active');

        this.isUserInfoTab = updateMode == 'personal-data';
        this.isRecoveryQuestionsTab = updateMode == 'questions';

        this.updateMode = updateMode == 'personal-data' ? 'Personal Data' :
                'Recovery Questions';

        return false;
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

        if (this.credentialRows) {

            this._globalEventsManager.showLoadingOverload(true);

            let params = {
                email: jQuery('#email').val(),
                firstName: jQuery('#first-name').val(),
                lastName: jQuery('#last-name').val()
            };

            this._authServices.updateUserInfo(params)
                .subscribe(
                    response => {

                        localStorage.setItem('userInfo', JSON.stringify(response));

                        this.updateUserInfoRows();
                        this._globalEventsManager.updateUserWelcome();
                        this._globalEventsManager.messageBox({
                            text: 'User Info updated successfully'
                        });

                        this._globalEventsManager.authPopup('');
                    },
                    err => {
                        this._authServices.showSigningError(err,
                                'Error updating user info');
                        this._globalEventsManager.showLoadingOverload(false);
                    },
                    () => {
                        this._globalEventsManager.showLoadingOverload(false);
                    }
                );
        }

        if (this.recoveryQuestions) {

            let results = this._authServices.checkRecoveryQuestions();

            if (results.duplicate.length || results.noAnswer.length) {
                return false;
            } else {

                delete results.duplicate;
                delete results.noAnswer;

                this._globalEventsManager.showLoadingOverload(true);

                this._authServices.updateRecoveryQuestions(results)
                    .subscribe(
                        response => {

                            this._globalEventsManager.messageBox({
                                text: 'Password recovery questions were updated!'
                            });

                            this._globalEventsManager.authPopup('');
                        },
                        err => {
                            this._authServices.showSigningError(err,
                                    'Error updating password recovery questions');
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

}