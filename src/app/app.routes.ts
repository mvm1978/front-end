import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './common/layouts/page-not-found/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/mvm/welcome',
        pathMatch: 'full'
    },
    {
        path: 'mvm',
        redirectTo: '/mvm/welcome',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

export const AppRouting = RouterModule.forRoot(appRoutes);
