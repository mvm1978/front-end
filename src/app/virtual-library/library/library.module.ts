import {NgModule} from '@angular/core';

import {VoteModule} from '../../common/layouts/vote/vote.module';
import {SharedModule} from '../../common/modules/shared.module';

import {LibraryComponent} from './library.component';
import {BookDefinitionComponent} from './book-definition/book-definition.component';
import {BookVoteComponent} from './book-vote/book-vote.component';

@NgModule({
    imports: [
        SharedModule,
        VoteModule
    ],
    declarations: [
        LibraryComponent,
        BookVoteComponent,
        BookDefinitionComponent
    ],
    exports: [
        SharedModule,
        LibraryComponent,
        BookVoteComponent,
        BookDefinitionComponent,
        VoteModule
    ]
})

export class LibraryModule {}