import {Component} from '@angular/core';

import {Constants} from '../../../core/constants';

import {VoteComponent} from '../vote.component';

@Component({
    selector: 'down-vote',
    templateUrl: Constants.VOTE_PATH + 'down/down-vote.component.html',
    styleUrls: [
        Constants.VOTE_PATH + 'down/down-vote.component.css',
        Constants.VOTE_PATH + 'vote.component.css',
        Constants.AG_GRID_PATH + 'ag-grid.component.css'
    ]
})

export class DownVoteComponent extends VoteComponent
{
}