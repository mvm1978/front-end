import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {PathLocationStrategy, LocationStrategy} from '@angular/common';

import {AppRouting} from './app.routes';

import {AuthModule} from './auth/auth.module';
import {VirtualLibraryModule} from './virtual-library/virtual-library.module';

import {PageNotFoundComponent} from './common/layouts/page-not-found/page-not-found.component';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/layouts/header/header.component';
import {FooterComponent} from './common/layouts/footer/footer.component';
import {MainBodyComponent} from './common/layouts/main-body/main-body.component';
import {MessageBoxComponent} from './common/layouts/message-box/message-box.component';

import {HomeComponent} from './home/home.component';

import {CoreProviders} from './common/core/load';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        HttpModule,
        AppRouting,
        AuthModule,
        VirtualLibraryModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MainBodyComponent,
        MessageBoxComponent,
        PageNotFoundComponent,
        HomeComponent
    ],
    providers: [
        CoreProviders,
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}