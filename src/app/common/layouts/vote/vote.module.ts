import {NgModule} from '@angular/core';

import {UpVoteComponent} from '../vote/up/up-vote.component';
import {DownVoteComponent} from '../vote/down/down-vote.component';

@NgModule({
    declarations: [
        UpVoteComponent,
        DownVoteComponent
    ],
    exports: [
        UpVoteComponent,
        DownVoteComponent
    ]
})

export class VoteModule {}