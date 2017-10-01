import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {mvmConstants} from '../mvm.constants';
import {AuthServices} from '../../auth/auth.services';

import {AnswersServices} from '../services/answers.services';
import {QuizzesServices} from '../services/quizzes.services';
import {QuizResultsServices} from '../services/quiz-results.services';

declare var jQuery: any;

@Component({
    selector: 'quizzes',
    providers: [
        AuthServices,
        AnswersServices,
        QuizzesServices,
        QuizResultsServices
    ],
    templateUrl: mvmConstants.QUIZ_PATH + 'quizzes.component.html',
    styleUrls: [
        mvmConstants.QUIZ_PATH + 'quizzes.component.css'
    ],
})

export class QuizzesComponent
{
    public quizTypes: any = [];
    public quizQuestions: any = [];

    //**************************************************************************

    constructor (
        protected _globalEventsManager: GlobalEventsManager,
        private _answersServices: AnswersServices,
        private _quizzesServices: QuizzesServices,
        private _quizResultsServices: QuizResultsServices
    )
    {
        let that = this;

        this._globalEventsManager.showLoadingOverload(true);

        this._answersServices.getTypeInfo()
            .subscribe(
                response => {
                    jQuery.each(response, function(key: string, values: any) {
                        that.quizTypes.push(key);
                    });
                },
                err => {
                    if (err.statusText == 'Unauthorized') {
                        this._globalEventsManager.forceSignIn();
                    }
                },
                () => {}
            );

        this._quizzesServices.get()
            .subscribe(
                response => {
                    this.quizQuestions = response;
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

    public onSelect(id: string)
    {
        jQuery('#' + id + '-label').toggleClass('answer')
            .toggleClass('selected-answer');
    }

    //**************************************************************************

    public onSubmit()
    {
        let results = {};

        jQuery('.quiz-answers:checked').map(function() {

            let question_id = jQuery(this).attr('data-question'),
                answer_id = jQuery(this).attr('data-answer');

            if (! results.hasOwnProperty(question_id)) {
                results[question_id] = [];
            }

            results[question_id].push(answer_id);
        });

        this._globalEventsManager.showLoadingOverload(true);

        this._quizResultsServices.create(results)
            .subscribe(
                response => {
                    window.open('/#/mvm/reports', '_self');
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

        return false;
    }

    //**************************************************************************


}
