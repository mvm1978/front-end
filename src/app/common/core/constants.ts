export class Constants
{

    //**************************************************************************

    public static get LAYOUTS_PATH(): string {
        return 'app/common/layouts/';
    }

    //**************************************************************************

    public static get MESSAGE_BOX_PATH(): string {
        return this.LAYOUTS_PATH + 'message-box/';
    }

    //**************************************************************************

    public static get AUTH_LAYOUTS_PATH(): string {
        return 'app/auth/layouts/';
    }

    //**************************************************************************

    public static get MVM_PATH(): string
    {
        return 'app/mvm/';
    }

    //**************************************************************************

    public static get AUTH_PATH(): string {
        return 'app/auth/';
    }

    //**************************************************************************

    public static get SIGN_UP_PATH(): string {
        return 'app/auth/sign-up/';
    }

    //**************************************************************************

    public static get RECOVERY_QUESTIONS_PATH(): string {
        return 'app/auth/layouts/recovery-questions/';
    }

    //**************************************************************************

    public static get SIGN_IN_PATH(): string {
        return 'app/auth/sign-in/';
    }

    //**************************************************************************

    public static get PASSWORD_RESET_PATH(): string {
        return 'app/auth/password-reset/';
    }

    //**************************************************************************

    public static get PASSWORD_RECOVERY_PATH(): string {
        return 'app/auth/password-recovery/';
    }

    //**************************************************************************

    public static get USER_INFO_PATH(): string {
        return 'app/auth/user-info/';
    }

    //**************************************************************************

}