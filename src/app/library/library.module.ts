import {NgModule} from '@angular/core';

import {LibraryRouting} from './library.routes';

import {GenreModule} from '../library/genre/genre.module';
import {AuthorModule} from '../library/author/author.module';
import {BookModule} from '../library/book/book.module';

import {RowInputGroupServices} from '../common/layouts/row-input-group/row-input-group.services';
import {ApiServices} from './api.services';
import {AuthServices} from '../auth/auth.services';

@NgModule({
    imports: [
        LibraryRouting,
        GenreModule,
        AuthorModule,
        BookModule
    ],
    providers: [
        RowInputGroupServices,
        ApiServices,
        AuthServices
    ],
    declarations: [
    ],
    exports: [
        GenreModule,
        AuthorModule,
        BookModule
    ]
})

export class LibraryModule {}