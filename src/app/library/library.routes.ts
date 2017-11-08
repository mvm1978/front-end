import {RouterModule, Routes} from '@angular/router';

import {BookUploadComponent} from '../library/book-upload/book-upload.component';
import {AuthorComponent} from '../library/author/author.component';
//import {ReportsComponent} from '../library/reports/reports.component';

const libraryRoutes: Routes = [
    {
        path: 'library/author',
        component: AuthorComponent
    },
    {
        path: 'library/book-upload',
        component: BookUploadComponent
//    },
//    {
//        path: 'library/password-recovery',
//        component: HomeComponent
//    },
//    {
//        path: 'library/books',
//        component: BooksComponent
//    },
//    {
//        path: 'library/reports',
//        component: ReportsComponent
    }
];

export const LibraryRouting = RouterModule.forRoot(libraryRoutes);
