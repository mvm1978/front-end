import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {SharedServices} from '../../common/services/shared.services';
import {ApiServices} from '../api.services';

@Injectable()

export class AuthorsServices
{
    public api: string;

    constructor(
        private _http: Http,
        private _sharedServices: SharedServices,
        private _apiServices: ApiServices
    )
    {
        this.api = this._apiServices._api + '/author';
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

    public upload(formData: any)
    {
        let url = this.api,
            header = this._apiServices.getAuthHeader();

        header.headers.delete('Content-Type');

        return this._http.post(url, formData, header).map(res => res.json());
    }

    //**************************************************************************

    public showError(err: any, defaultMessage: string): string
    {
        return this._sharedServices.handleInputErrors({
            err: err,
            defaultMessage: defaultMessage,
            service: this,
            footer: 'author'
        })
    }

    //**************************************************************************

    public getErrorInfo(response: any, defaultMessage: string): {message: string, forseSignIn: boolean}
    {
        let message: string = '',
            forseSignIn: boolean = false;

        switch (response.message) {
            case 'author_exists':
                this._sharedServices.showRowError('author-name', 'Author exists');
                break;
            case 'invalid_upload_mime_type':
                this._sharedServices.showRowError('upload', 'Upload file must be a picture');
                break;
            case 'empty_upload_file':
                this._sharedServices.showRowError('upload', 'Upload file must not be empty');
                break;
            case 'invalid_upload_size':
                this._sharedServices.showRowError('upload', 'Upload file size must less than 5 Mb');
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