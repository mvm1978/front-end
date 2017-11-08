import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './common/layouts/page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
