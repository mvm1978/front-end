import {Injectable} from '@angular/core';

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

    public root = this._apiRoot.root;
    public api = this._apiRoot.api + '/library/v1';

    //**************************************************************************

    public getAuthHeader(): any
    {
        return this._authServices.getAuthHeader();
    }

    //**************************************************************************

    public checkToken(): any
    {
        return this._authServices.checkToken();
    }

    //**************************************************************************

}
