import {Injectable} from '@angular/core';

import {ApiServices} from './api.services';

@Injectable()

export class QuizResultsServices extends ApiServices
{

    //**************************************************************************

    public get()
    {
        let url = this.getQuizzes;

        return this._http.get(url, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

    public create(data: any)
    {
        let url = this.createQuiz + '/' + localStorage.getItem('userID');

        return this._http.post(url, data, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

    public getQuizResults()
    {
        let url = this.quizResults + '/' + localStorage.getItem('userID');

        return this._http.get(url, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

}
