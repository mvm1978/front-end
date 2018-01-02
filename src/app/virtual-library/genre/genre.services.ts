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

    public showError(data: any): void
    {
        data['service'] = this;
        data['forceSignIn'] = true;

        this._sharedServices.handleInputErrors(data);
    }

    //**************************************************************************

    public outputErrorInfo(data: any): void
    {
        let service = this._sharedServices;

        if (! data.response.hasOwnProperty('message')) {

            service.showRowError(data.output, data.defaultMessage);

            return;
        }

        let authorizationError = service.getAuthorizationError(data.response.message);

        if (authorizationError) {
            service.showRowError(data.output, authorizationError);
        } else {
            switch (data.response.message) {
                case 'genre_exists':
                    service.showRowError('genre-name', 'Genre exists');
                    break;
                default:
                    service.showRowError(data.output, data.defaultMessage);
                    break;
            }
        }
    }

    //**************************************************************************

    public createReportPDF(data: any): any
    {
        let url = this.api + '/create-report-pdf',
            header = this._apiServices.getAuthHeader();

        return this._http.post(url, data, header).map(res => res.json());
    }

    //**************************************************************************

    public getCount(): any
    {
        let header = this._apiServices.getAuthHeader();

        return this._http.get(this.api + '/count', header).map(res => res.json());
    }

    //**************************************************************************

}