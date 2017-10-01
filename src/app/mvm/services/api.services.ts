import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';

@Injectable()

export class ApiServices
{
    public authHeader: any;

    constructor(
        private _apiRoot: ApiRoot,
        private _httpModule: Http,
        private _authServices: AuthServices
    )
    {
        this.authHeader = this.getAuthHeader();
    }

    //**************************************************************************

    private _api = this._apiRoot.api + '/mvm/v1';

    protected _http = this._httpModule;

    public questions = this._api + '/questions';
    public answers = this._api + '/answers';
    public quizzes = this._api + '/quizzes';
    public quizResults = this._api + '/quiz-results';

    //**************************************************************************

    public getQuestions = this.questions + '/get';
    public getAnswers = this.answers + '/get';
    public getAnswerTypeInfo = this.answers + '/get-type-info';
    public getQuizzes = this.quizzes + '/get';
    public createQuiz = this.quizResults + '/create';

    //**************************************************************************

    public getAuthHeader()
    {
        return this._authServices.getAuthHeader();
    }

    //**************************************************************************

}
