import {RouterModule, Routes} from '@angular/router';

import {GenreComponent} from '../library/genre/genre.component';
import {AuthorComponent} from '../library/author/author.component';
import {BookComponent} from '../library/book/book.component';

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
        component: BookComponent
    },
    {
        path: 'library/author',
        component: AuthorComponent
    }
];

export const LibraryRouting = RouterModule.forRoot(libraryRoutes);
