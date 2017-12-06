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
        this.api = this._apiServices.api + '/genre';
    }

    //**************************************************************************

    public checkToken(): any
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

    public patch(field: string, id: number, payload: any): any
    {
        let url = this.api + '/' + field + '/' + id,
            header = this._apiServices.getAuthHeader();

        return this._http.patch(url, payload, header).map(res => res.json());
    }

    //**************************************************************************

    public upload(payload: any): any
    {
        let url = this.api,
            header = this._apiServices.getAuthHeader();

        header.headers.delete('Content-Type');

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

    public getErrorInfo(
        response: any,
        defaultMessage: string
    ): {message: string, output: string, forceSignIn: boolean}
    {
        let service = this._sharedServices,
            output = '';

        let message: string = service.getCommonErrorMessage(response.message);

        if (message) {
            output = 'genre-popup-footer';
        } else {
            switch (response.message) {
                case 'genre_exists':
                    service.showRowError('genre', 'Genre exists');
                    break;
                default:
                    message = defaultMessage;
                    break;
            }
        }

        return {
            message: message,
            output: output,
            forceSignIn: false
        }
    }

    //**************************************************************************

}