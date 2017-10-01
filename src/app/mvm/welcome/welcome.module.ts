import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule} from '../../auth/auth.module';
import {AuthComponent} from '../../auth/auth.component';

import {GlobalEventsManager} from '../../common/modules/global-events-manager';

@NgModule({
    imports: [
        CommonModule,
        AuthModule
    ],
    providers: [
        GlobalEventsManager
    ],
    declarations: [
        AuthComponent
    ],
    exports: [
        AuthComponent
    ]
})

export class WelcomeModule {}