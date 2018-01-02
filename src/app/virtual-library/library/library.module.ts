import {NgModule} from '@angular/core';

import {VoteModule} from '../../common/layouts/vote/vote.module';
import {SharedModule} from '../../common/modules/shared.module';

import {LibraryComponent} from './library.component';

@NgModule({
    imports: [
        SharedModule,
        VoteModule
    ],
    declarations: [
        LibraryComponent
    ],
    exports: [
        SharedModule,
        LibraryComponent,
        VoteModule
    ]
})

export class LibraryModule {}