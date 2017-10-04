import {RouterModule, Routes} from '@angular/router';

import {WelcomeComponent} from '../mvm/welcome/welcome.component';

//import {QuizzesComponent} from '../mvm/quizzes/quizzes.component';
//import {ReportsComponent} from '../mvm/reports/reports.component';

const ableToRoutes: Routes = [
    {
        path: 'mvm/welcome',
        component: WelcomeComponent
    },
    {
        path: 'mvm/password-recovery',
        component: WelcomeComponent
//    },
//    {
//        path: 'mvm/quizzes',
//        component: QuizzesComponent
//    },
//    {
//        path: 'mvm/reports',
//        component: ReportsComponent
    }
];

export const MvmRouting = RouterModule.forRoot(ableToRoutes);
