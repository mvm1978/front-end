import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MvmRouting} from './mvm.routes';
import {AuthModule} from '../auth/auth.module';
import {SharedModule} from '../common/modules/shared.module';

import {GlobalEventsManager} from '../common/modules/global-events-manager';

import {WelcomeComponent} from './welcome/welcome.component';


@NgModule({
    imports: [
        CommonModule,
        MvmRouting,
        AuthModule,
        SharedModule
    ],
    providers: [
        GlobalEventsManager
    ],
    declarations: [
        WelcomeComponent
    ]
})

export class MvmModule {}