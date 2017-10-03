import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {SharedModule} from './common/modules/shared.module';

import {AppRouting} from './app.routes';
import {MvmModule} from './mvm/mvm.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/layouts/header/header.component';
import {FooterComponent} from './common/layouts/footer/footer.component';
import {MainBodyComponent} from './common/layouts/main-body/main-body.component';

import {CoreProviders} from './common/core/load';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpModule,
        SharedModule,
        AppRouting,
        MvmModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainBodyComponent
    ],
    providers: [
        CoreProviders,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}