import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordResetComponent} from '../../auth/password-reset/password-reset.component';
import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        PasswordResetComponent,
        CredentialsRowComponent
    ],
    exports: [
        PasswordResetComponent,
        CredentialsRowComponent
    ]
})

export class PasswordResetModule {}