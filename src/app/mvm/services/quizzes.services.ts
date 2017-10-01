import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {ApiServices} from './api.services';

@Injectable()

export class QuizzesServices extends ApiServices
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

}