import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ValidateInputServices} from '../common/services/validate-input.services';

import {AuthComponent} from '../auth/auth.component';
import {SignInComponent} from '../auth/sign-in/sign-in.component';
import {SignUpComponent} from '../auth/sign-up/sign-up.component';
import {PasswordResetComponent} from '../auth/password-reset/password-reset.component';
import {PasswordRecoveryComponent} from '../auth/password-recovery/password-recovery.component';
import {UserInfoComponent} from '../auth/user-info/user-info.component';
import {RecoveryQuestionsComponent} from './layouts/recovery-questions/recovery-questions.component';
import {CredentialsRowComponent} from './layouts/credentials-row/credentials-row.component';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        ValidateInputServices
    ],
    declarations: [
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        PasswordResetComponent,
        PasswordRecoveryComponent,
        UserInfoComponent,
        RecoveryQuestionsComponent,
        CredentialsRowComponent
    ],
    exports: [
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        PasswordResetComponent,
        PasswordRecoveryComponent,
        UserInfoComponent,
        RecoveryQuestionsComponent,
        CredentialsRowComponent
    ]
})

export class AuthModule {}