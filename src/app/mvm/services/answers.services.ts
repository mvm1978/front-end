import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiServices} from './api.services';

@Injectable()

export class AnswersServices extends ApiServices
{

    //**************************************************************************

    public get()
    {
        let url = this.getAnswers;

        return this._http.get(url, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

    public getTypeInfo()
    {
        let url = this.getAnswerTypeInfo;

        return this._http.get(url, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

}
