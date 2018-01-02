import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';

@Injectable()

export class LlibraryServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices.api + '/library';
    }

    //**************************************************************************

    public getTableData(url: string, data: any): any
    {
        let params = this._sharedServices.getParamString(data),
            header = this._sharedServices.getHeader();;

        return this._http.get(url + '?' + params, header).map(res => res.json());
    }

    //**************************************************************************

}