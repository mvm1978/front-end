import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {mvmConstants} from '../mvm.constants';
import {AuthServices} from '../../auth/auth.services';

import {QuizResultsServices} from '../services/quiz-results.services';

@Component({
    selector: 'reports',
    providers: [
        AuthServices,
        QuizResultsServices
    ],
    templateUrl: mvmConstants.REPORTS_PATH + 'reports.component.html',
    styleUrls: [
        mvmConstants.REPORTS_PATH + 'reports.component.css'
    ],
})

export class ReportsComponent
{
    public chartData: any = [];

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        private _quizResultsServices: QuizResultsServices
    )
    {
        this._globalEventsManager.showLoadingOverload(true);

        this._quizResultsServices.getQuizResults()
            .subscribe(
                response => {
                    this.chartData = response;
                },
                err => {
                    if (err.statusText == 'Unauthorized') {
                        this._globalEventsManager.forceSignIn();
                    }
                },
                () => {
                    this._globalEventsManager.showLoadingOverload(false);
                }
            );
    }

    //**************************************************************************

    public ngOnInit()
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);
    }

    //**************************************************************************

    public toQuiz()
    {
        window.open('/#/mvm/quizzes', '_self');
    }

    //**************************************************************************

}
