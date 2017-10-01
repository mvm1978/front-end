import {Constants} from '../common/core/constants';

export class mvmConstants
{
    public static get APP(): string {
        return 'mvm';
    }

    //**************************************************************************

    public static get WELCOME_PATH(): string {
        return Constants.MVM_PATH + 'welcome/';
    }

    //**************************************************************************

    public static get QUIZ_PATH(): string {
        return Constants.MVM_PATH + 'quizzes/';
    }

    //**************************************************************************

    public static get REPORTS_PATH(): string {
        return Constants.MVM_PATH + 'reports/';
    }

    //**************************************************************************

}