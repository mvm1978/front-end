import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';

@Injectable()

export class booksServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices.api + '/book';
    }

    //**************************************************************************

    public checkToken(): any
    {
        return this._apiServices.checkToken();
    }

    //**************************************************************************

    public patch(field: string, id: number, payload: any): any
    {
        let url = this.api + '/' + field + '/' + id,
            header = this._apiServices.getAuthHeader();

        if (field == 'picture') {
            header.headers.delete('Content-Type');
        }

        return field == 'picture' ?
            this._http.post(url, payload, header).map(res => res.json()) :
            this._http.patch(url, payload, header).map(res => res.json());
    }

    //**************************************************************************

    public upload(formData: any): any
    {
        let url = this.api,
            header = this._apiServices.getAuthHeader();

        header.headers.delete('Content-Type');

        return this._http.post(url, formData, header).map(res => res.json());
    }

    //**************************************************************************

    public vote(id: number, payload: any): any
    {
        let url = this.api + '/vote/' + id,
            header = this._apiServices.getAuthHeader();

        return this._http.post(url, payload, header).map(res => res.json());
    }

    //**************************************************************************

    public getCharts(): any
    {
        let url = this.api + '/chart',
            header = this._apiServices.getAuthHeader();

        return this._http.get(url, header).map(res => res.json());
    }

    //**************************************************************************

    public showError(data: any): void
    {
        data['service'] = this;

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
                case 'book_exists':
                    service.showRowError('book-name', 'Book exists');
                    break;
                case 'invalid_upload_mime_type':
                    service.showRowError('upload', 'Upload file must be a picture');
                    break;
                case 'empty_upload_file':
                    service.showRowError('upload', 'Upload file must not be empty');
                    break;
                case 'invalid_upload_size':
                    service.showRowError('upload', 'Upload file size must less than 5 Mb');
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

    public getTopBooks(amount: number): any
    {
        let url = this.api + '/top/' + amount,
            header = this._apiServices.getAuthHeader();

        return this._http.get(url, header).map(res => res.json());
    }

    //**************************************************************************

}