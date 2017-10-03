import {Component, ViewChild} from '@angular/core';

import {GlobalEventsManager} from '../../../common/modules/global-events-manager';
import {Constants} from '../../../common/core/constants';
import {AuthServices} from '../../../auth/auth.services';

declare var jQuery: any;

@Component({
    selector: 'recovery-questions',
    providers: [
        AuthServices
    ],
    templateUrl: Constants.RECOVERY_QUESTIONS_PATH + 'recovery-questions.component.html',
    styleUrls: [
        Constants.RECOVERY_QUESTIONS_PATH + 'recovery-questions.component.css',
        Constants.AUTH_PATH + 'auth.component.css'
    ],
})

export class RecoveryQuestionsComponent
{
    public isDataAvailable: boolean = false;
    public questionCount: any = Array.apply(null, {length: 3}).map(Number.call, Number);
    public questions: any = [];

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        private _authServices: AuthServices
    )
    {
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._authServices.getRecoveryQuestions()
            .subscribe(
                response => {
                    this.questions = response;
                    this.isDataAvailable = true;
                },
                err => {
                    this._authServices.showSigningError(err, 'Error getting recovery question');
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );
    }

    //**************************************************************************


    public onChange(id: string)
    {
console.log(id);
        jQuery('#' + id + '-group').removeClass('has-error');
        jQuery('#' + id + '-footer').html('');
    }

    //**************************************************************************

    public onClose()
    {
        this._globalEventsManager.signUp(false);

        return false;
    }

    //**************************************************************************

}