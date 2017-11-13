import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';

@Injectable()

export class GenresServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices._api + '/genre';
    }

    //**************************************************************************

    public checkToken()
    {
        return this._apiServices.checkToken();
    }

    //**************************************************************************

    public patch(id: number, payload: any)
    {
        let url = this.api + '/' + id,
            header = this._apiServices.getAuthHeader();

        return this._http.patch(url, payload, header).map(res => res.json());
    }

    //**************************************************************************

    public upload(payload: any)
    {
        let url = this.api,
            header = this._apiServices.getAuthHeader();

        return this._http.post(url, payload, header).map(res => res.json());
    }

    //**************************************************************************

    public showError(err: any, defaultMessage: string): string
    {
        return this._sharedServices.handleInputErrors({
            err: err,
            defaultMessage: defaultMessage,
            service: this,
            footer: 'genre'
        })
    }

    //**************************************************************************

    public getErrorInfo(response: any, defaultMessage: string): {message: string, forseSignIn: boolean}
    {
        let message: string = '',
            forseSignIn: boolean = false;

        switch (response.message) {
            case 'genre_exists':
                this._sharedServices.showRowError('genre-name', 'Genre exists');
                break;
            default:
                message = defaultMessage;
                break;
        }

        return {
            message: message,
            forseSignIn: forseSignIn
        }
    }

    //**************************************************************************

}