import {NgModule} from '@angular/core';

import {VirtualLibraryRouting} from './virtual-library.routes';

import {GenreModule} from '../virtual-library/genre/genre.module';
import {AuthorModule} from '../virtual-library/author/author.module';
import {BookModule} from '../virtual-library/book/book.module';
import {LibraryModule} from '../virtual-library/library/library.module';

import {RowInputGroupServices} from '../common/layouts/row-input-group/row-input-group.services';
import {ApiServices} from './api.services';
import {AuthServices} from '../auth/auth.services';

@NgModule({
    imports: [
        VirtualLibraryRouting,
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
        BookModule,
        LibraryModule
    ]
})

export class VirtualLibraryModule {}