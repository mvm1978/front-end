import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiServices} from './api.services';

@Injectable()

export class QuestionsServices extends ApiServices
{

    //**************************************************************************

    public get()
    {
        let url = this.getQuestions;

        return this._http.get(url, {
            headers: this.authHeader
        }).map(res => res.json());
    }

    //**************************************************************************

}
