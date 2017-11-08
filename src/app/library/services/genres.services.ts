import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ApiRoot} from '../../common/api-root';
import {AuthServices} from '../../auth/auth.services';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class GenresServices
{
    private _api = this._apiRoot.api + '/library/v1';

    constructor(
        private _apiRoot: ApiRoot,
        private _http: Http,
        private _authServices: AuthServices
    )
    {

    }

    //**************************************************************************

    public getGenres()
    {
        let url = this._api + '/genres/get',
            header = this._authServices.getAuthHeader();

        return this._http.get(url, header).map(res => res.json());
    }

    //**************************************************************************

}
