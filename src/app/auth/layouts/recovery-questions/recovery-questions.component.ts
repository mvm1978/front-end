import {Component} from '@angular/core';

import {Constants} from '../../../common/core/constants';
import {SharedServices} from '../../../common/services/shared.services';
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
        private _sharedServices: SharedServices,
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
                    this._authServices.showError(err,
                            'Error getting recovery question');
                },
                () => {}
            );
    }

    //**************************************************************************

    public onChange(id: string)
    {
        this._sharedServices.clearRowErrors(id);
    }

    //**************************************************************************

}