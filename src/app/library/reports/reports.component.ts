import {Component} from '@angular/core';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';
import {LibraryConstants} from '../library.constants';
import {AuthServices} from '../../auth/auth.services';

import {VotesServices} from '../services/votes.services';

@Component({
    selector: 'reports',
    providers: [
        AuthServices,
        VotesServices
    ],
    templateUrl: LibraryConstants.REPORTS_PATH + 'reports.component.html',
    styleUrls: [
        LibraryConstants.REPORTS_PATH + 'reports.component.css'
    ],
})

export class ReportsComponent
{
    public chartData: any = [];

    //**************************************************************************

    constructor (
        private _globalEventsManager: GlobalEventsManager,
        private _quizResultsServices: VotesServices
    )
    {
        this._globalEventsManager.showLoadingOverload(true);

//        this._quizResultsServices.getVotes()
//            .subscribe(
//                response => {
//                    this.chartData = response;
//                },
//                err => {
//                    if (err.statusText == 'Unauthorized') {
//                        this._globalEventsManager.forceSignIn();
//                    }
//                },
//                () => {
//                    this._globalEventsManager.showLoadingOverload(false);
//                }
//            );
    }

    //**************************************************************************

    private ngOnInit(): void
    {
        this._globalEventsManager.showHeader(true);
        this._globalEventsManager.showFooter(true);
    }

    //**************************************************************************

    public toQuiz()
    {
        window.open('/#/library/books', '_self');
    }

    //**************************************************************************

}
