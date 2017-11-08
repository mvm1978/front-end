import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {ApiRoot} from '../common/api-root';
import {AuthServices} from '../auth/auth.services';

@Injectable()

export class ApiServices
{
    public authHeader: any;

    constructor(
        private _apiRoot: ApiRoot,
        private _authServices: AuthServices
    )
    {
        this.authHeader = this.getAuthHeader();
    }

    //**************************************************************************

    public _api = this._apiRoot.api + '/library/v1';

    //**************************************************************************

    public getAuthHeader()
    {
        return this._authServices.getAuthHeader();
    }

    //**************************************************************************

    public checkToken()
    {
        return this._authServices.checkToken();
    }

    //**************************************************************************

}
