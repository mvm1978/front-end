import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ApiServices} from '../api.services';

@Injectable()

export class TypesServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices.api + '/type';
    }

    //**************************************************************************

    public checkToken(): void
    {
        return this._apiServices.checkToken();
    }

    //**************************************************************************

    public getDropdown(): any
    {
        let header = this._apiServices.getAuthHeader();

        return this._http.get(this.api + '/dropdown', header).map(res => res.json());
    }

    //**************************************************************************

    public getCount(): any
    {
        let header = this._apiServices.getAuthHeader();

        return this._http.get(this.api + '/count', header).map(res => res.json());
    }

    //**************************************************************************

}