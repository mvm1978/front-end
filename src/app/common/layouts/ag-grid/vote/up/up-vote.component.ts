import {Component} from '@angular/core';

import {Constants} from '../../../../core/constants';

import {VoteComponent} from '../vote.component';

@Component({
    selector: 'up-vote',
    templateUrl: Constants.AG_GRID_VOTE_PATH + 'up/up-vote.component.html',
    styleUrls: [
        Constants.AG_GRID_VOTE_PATH + 'up/up-vote.component.css',
        Constants.AG_GRID_VOTE_PATH + 'vote.component.css',
        Constants.AG_GRID_PATH + 'ag-grid.component.css'
    ]
})

export class UpVoteComponent extends VoteComponent
{
}