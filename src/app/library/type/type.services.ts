import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';

@Injectable()

export class TypesServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices._api + '/type';
    }

    //**************************************************************************

    public checkToken()
    {
        return this._apiServices.checkToken();
    }

    //**************************************************************************

    public getDropdown()
    {
        let header = this._apiServices.getAuthHeader();

        return this._http.get(this.api + '/dropdown', header).map(res => res.json());
    }

    //**************************************************************************

}