import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LibraryRouting} from './library.routes';
import {SharedModule} from '../common/modules/shared.module';
import {GlobalEventsManager} from '../common/modules/global-events-manager';

import {AuthorComponent} from '../library/author/author.component';
import {AddAuthorComponent} from '../library/author/add-author/add-author.component';

import {BookUploadComponent} from '../library/book-upload/book-upload.component';

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
        AuthorComponent,
        AddAuthorComponent,
        BookUploadComponent
    ],
    exports: [
        AuthorComponent,
        AddAuthorComponent,
        BookUploadComponent
    ]
})

export class LibraryModule {}