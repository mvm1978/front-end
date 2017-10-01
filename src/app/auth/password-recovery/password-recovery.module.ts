import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PasswordRecoveryComponent} from '../../auth/password-recovery/password-recovery.component';
import {CredentialsRowComponent} from '../layouts/credentials-row/credentials-row.component';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        PasswordRecoveryComponent,
        CredentialsRowComponent
    ],
    exports: [
        PasswordRecoveryComponent,
        CredentialsRowComponent
    ]
})

export class PasswordRecoveryModule {}