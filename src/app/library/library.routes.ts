import {RouterModule, Routes} from '@angular/router';

import {BookUploadComponent} from '../library/book-upload/book-upload.component';
import {GenreComponent} from '../library/genre/genre.component';
import {AuthorComponent} from '../library/author/author.component';
//import {ReportsComponent} from '../library/reports/reports.component';

const libraryRoutes: Routes = [
    {
        path: 'library/author',
        component: AuthorComponent
    },
    {
        path: 'library/genre',
        component: GenreComponent
    },
    {
        path: 'library/book',
        component: BookUploadComponent
    },
    {
        path: 'library/author',
        component: AuthorComponent
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
