import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRouting} from './library.routes';
import {SharedModule} from '../common/modules/shared.module';
import {GlobalEventsManager} from '../common/modules/global-events-manager';

import {GenreComponent} from '../library/genre/genre.component';
import {AddGenreComponent} from '../library/genre/add-genre/add-genre.component';

import {AuthorComponent} from '../library/author/author.component';
import {AddAuthorComponent} from '../library/author/add-author/add-author.component';

import {BookComponent} from '../library/book/book.component';
import {AddBookComponent} from '../library/book/add-book/add-book.component';

import {RowInputGroupServices} from '../common/layouts/row-input-group/row-input-group.services';
import {ApiServices} from './api.services';
import {AuthServices} from '../auth/auth.services';

@NgModule({
    imports: [
        CommonModule,
        LibraryRouting,
        SharedModule
    ],
    providers: [
        GlobalEventsManager,
        RowInputGroupServices,
        ApiServices,
        AuthServices
    ],
    declarations: [
        GenreComponent,
        AddGenreComponent,
        AuthorComponent,
        AddAuthorComponent,
        BookComponent,
        AddBookComponent
    ],
    exports: [
        GenreComponent,
        AddGenreComponent,
        AuthorComponent,
        AddAuthorComponent,
        BookComponent,
        AddBookComponent
    ]
})

export class LibraryModule {}