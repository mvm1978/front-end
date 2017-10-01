import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignInModule} from '../auth/sign-in/sign-in.module';

import {ValidateInputServices} from '../common/services/validate-input.services';

import {AuthComponent} from '../auth/auth.component';
import {SignUpComponent} from '../auth/sign-up/sign-up.component';
import {PasswordResetComponent} from '../auth/password-reset/password-reset.component';
import {PasswordRecoveryComponent} from '../auth/password-recovery/password-recovery.component';

@NgModule({
    imports: [
       CommonModule,
       SignInModule
    ],
    providers: [
       ValidateInputServices
    ],
    declarations: [
        AuthComponent,
        SignUpComponent,
        PasswordResetComponent,
        PasswordRecoveryComponent
    ],
    exports: [
        AuthComponent
    ]
})

export class AuthModule {}