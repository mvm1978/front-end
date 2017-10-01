import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignUpComponent} from '../../auth/sign-up/sign-up.component';
import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        SignUpComponent,
        CredentialsRowComponent
    ],
    exports: [
        SignUpComponent,
        CredentialsRowComponent
    ]
})

export class SignUpModule {}