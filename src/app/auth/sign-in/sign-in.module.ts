import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignInComponent} from '../../auth/sign-in/sign-in.component';
import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        SignInComponent,
        CredentialsRowComponent
    ],
    exports: [
        SignInComponent,
        CredentialsRowComponent
    ]
})

export class SignInModule {}