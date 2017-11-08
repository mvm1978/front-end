import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AgGridModule} from 'ag-grid-angular/main';

import {SharedModule} from './common/modules/shared.module';

import {AppRouting} from './app.routes';
import {AuthModule} from './auth/auth.module';
import {LibraryModule} from './library/library.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/layouts/header/header.component';
import {FooterComponent} from './common/layouts/footer/footer.component';
import {MainBodyComponent} from './common/layouts/main-body/main-body.component';
import {MessageBoxComponent} from './common/layouts/message-box/message-box.component';

import {HomeComponent} from './home/home.component';

import {CoreProviders} from './common/core/load';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        HttpModule,
        AgGridModule,
        SharedModule,
        AppRouting,
        AuthModule,
        LibraryModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainBodyComponent,
        MessageBoxComponent,
        HomeComponent
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