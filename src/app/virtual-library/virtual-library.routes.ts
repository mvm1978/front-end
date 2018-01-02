import {RouterModule, Routes} from '@angular/router';

import {LibraryComponent} from '../virtual-library/library/library.component';
import {GenreComponent} from '../virtual-library/genre/genre.component';
import {AuthorComponent} from '../virtual-library/author/author.component';
import {BookComponent} from '../virtual-library/book/book.component';

const VirtualLibraryRoutes: Routes = [
    {
        path: 'virtual-library/library',
        component: LibraryComponent
    },
    {
        path: 'virtual-library/genre',
        component: GenreComponent
    },
    {
        path: 'virtual-library/book',
        component: BookComponent
    },
    {
        path: 'virtual-library/author',
        component: AuthorComponent
    }
];

export const VirtualLibraryRouting = RouterModule.forRoot(VirtualLibraryRoutes);
